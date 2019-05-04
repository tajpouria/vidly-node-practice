let server;
const winston = require('winston');
const request = require('supertest');
const { Movie } = require('../../models/movie');
const { Genre } = require('../../models/genre');
const adminToken = require('./adminToken');
const mongoose = require('mongoose');

describe('/api/movie', () => {
  let movieId;
  let token;
  let movieTitle;
  let genreId;
  let numberInStock;
  let dailyRentalRate;

  const generateMovieId = mongoose.Types.ObjectId();

  beforeEach(async () => {
    server = require('../../index');

    movieId = generateMovieId;

    await Movie.collection.insertMany(
      [
        {
          _id: movieId,
          title: 'movie1',
          genre: { name: 'genre1' }
        },
        {
          title: 'movie2',
          genre: { name: 'genre2' }
        }
      ],
      err => {
        if (err) return winston.error(err.message, err);
      }
    );
  });

  afterEach(async () => {
    server.close();
    await Movie.deleteMany({});
    await Genre.deleteMany({});
  });

  describe('GET/', () => {
    const execute = () => {
      return request(server).get('/api/movies');
    };

    it('Should return all movies when send GET request', async () => {
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(m => m.title === 'movie1')).toBeTruthy();
      expect(res.body.some(m => m.title === 'movie2')).toBeTruthy();
    });

    it('should return 404 if no movie found', async () => {
      await Movie.deleteMany({});

      const res = await execute();

      expect(res.status).toBe(404);
    });
  });
  describe('GET/:id', () => {
    const execute = () => {
      return request(server).get(`/api/movies/${movieId}`);
    };

    it('Should return 404 when receive an invalid id', async () => {
      const res = await request(server).get('/api/movies/122');
      expect(res.status).toBe(404);
    });

    it('Should return the movie by given id.', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'movie1');
    });
  });
  describe('POST/', () => {
    beforeEach(async () => {
      token = adminToken;
      movieTitle = '123';
      genreId = mongoose.Types.ObjectId();
      numberInStock = 1;
      dailyRentalRate = 20;

      await Genre.collection.insertOne({ _id: genreId, name: '12345' });
    });

    const execute = () => {
      return request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: movieTitle,
          genreId,
          numberInStock,
          dailyRentalRate
        });
    };

    afterEach(async () => {
      await Genre.deleteMany({});
      Movie.deleteMany({});
    });

    it('Should return 401 if no token provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('Should return 400 if movieTitle less than 3 character', async () => {
      movieTitle = '12';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 if movieTitle more than 255 character', async () => {
      movieTitle = new Array(257).join('a');

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 no genresId is provided', async () => {
      genreId = null;

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 no numberInStock is less than 0', async () => {
      numberInStock = -1;

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 dailyRentalRate is less than 0', async () => {
      dailyRentalRate = -1;

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 200 if request is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });

    it('Should save the movie if request is valid', async () => {
      await execute();

      const movie = await Movie.findById(movieId);
      expect(movie).not.toBeNull();
    });

    it('Should return movie if request is valid', async () => {
      const res = await execute();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('title', '123');
    });
  });

  describe('PUT/', () => {
    beforeEach(async () => {
      token = adminToken;
      movieTitle = '123';
      genreId = mongoose.Types.ObjectId();
      movieId = generateMovieId;
      numberInStock = 1;
      dailyRentalRate = 20;

      await Genre.collection.insertOne({ _id: genreId, name: '12345' });
    });

    const execute = () => {
      return request(server)
        .put(`/api/movies/${movieId}`)
        .set('x-auth-token', token)
        .send({
          title: movieTitle,
          genreId,
          numberInStock,
          dailyRentalRate
        });
    };

    afterEach(async () => {
      await Genre.deleteMany({});
      Movie.deleteMany({});
    });

    it('Should return 401 if no token provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('Should return 400 if movieTitle less than 3 character', async () => {
      movieTitle = '12';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 if movieTitle more than 255 character', async () => {
      movieTitle = new Array(257).join('a');

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 no genresId is provided', async () => {
      genreId = null;

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 no numberInStock is less than 0', async () => {
      numberInStock = -1;

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 400 dailyRentalRate is less than 0', async () => {
      dailyRentalRate = -1;

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('Should return 404 if no movie founded by the given id', async () => {
      movieId = '1';

      const res = await execute();

      expect(res.status).toBe(404);
    });
    it('should return 200 if request is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });

    it('Should update the movie if request is valid', async () => {
      movieTitle = 'newTitle';

      await execute();

      const movie = await Movie.findById(movieId);
      expect(movie.title).toBe('newTitle');
    });

    it('Should send Updated movie if request is valid', async () => {
      movieTitle = 'newTitle';

      const res = await execute();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('title', 'newTitle');
    });
  });

  describe('DELETE/', () => {
    beforeEach(() => {
      token = adminToken;
      movieId = generateMovieId;
    });

    const execute = () => {
      return request(server)
        .delete(`/api/movies/${movieId}`)
        .set('x-auth-token', token)
        .set('isAdmin', true);
    };

    it('should return 401 if token not provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return 404 if no movie founded by the given id', async () => {
      movieId = '1';

      const res = await execute();

      expect(res.status).toBe(404);
    });

    it('should return 200 if user is admin and id is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });

    it('should remove movie given id if user is admin and id is valid', async () => {
      await execute();

      expect(await Movie.findById(movieId)).toBeUndefined;
    });

    it('should send movie genre to the user', async () => {
      token = adminToken;

      const res = await execute();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('title', 'movie1');
    });
  });
});
