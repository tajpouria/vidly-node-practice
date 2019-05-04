let server;
const winston = require('winston');
const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const adminToken = require('./adminToken');

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });
  describe('GET/', () => {
    it('Should return all genres when send GET request', async () => {
      const arr = [{ name: 'genre1' }, { name: 'genre2' }];
      await Genre.collection.insertMany(arr, err => {
        if (err) winston.error(err.massage, err);
      });
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });
  describe('GET/:id', () => {
    it('Should return the genre by given id.', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'genre1');
    });
    it('Should return 404 when receive an invalid id', async () => {
      const res = await request(server).get('/api/genres/122');
      expect(res.status).toBe(404);
    });
  });
  describe('POST/', () => {
    let token;
    let genre;

    beforeEach(async () => {
      token = await new User().generateAuthToken();
    });

    const execude = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: genre });
    };
    it('Should return 401 when user not logged in.', async () => {
      token = '';
      const res = await execude();

      expect(res.status).toBe(401);
    });
    it('Should return 400 when genre name is less than 5 character', async () => {
      genre = '1234';
      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('Should return 400 when genre name is more than 50 character', async () => {
      genre = new Array(52).join('a');
      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('Should save the genres req is valid', async () => {
      genre = 'genre1';
      const res = await execude();

      expect(res.status).toBe(200);
      expect(await Genre.findOne({ name: 'genre1' })).not.toBeNull();
    });
    it('Should return genre if req is valid', async () => {
      const res = await execude();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
  describe('PUT/', () => {
    let token;
    let id;
    let name;

    beforeEach(async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      token = await new User().generateAuthToken();
      id = genre._id;
    });

    const execude = async () => {
      return request(server)
        .put(`/api/genres/${id}`)
        .set('x-auth-token', token)
        .send({ name });
    };

    it('should return 401 if user not provided token', async () => {
      token = '';

      const res = await execude();

      expect(res.status).toBe(401);
    });
    it('should return 400 if id not found', async () => {
      id = '1';

      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('should return 400 if genre no name provided', async () => {
      name = '';

      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('should return 400 if genre name lessThan 5 character', async () => {
      name = '1234';

      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('should return 400 if genre name moreThan 50 character', async () => {
      name = new Array(52).join('a');

      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('should return 200 if genre name is valid', async () => {
      name = 'valid genre name';

      const res = await execude();

      expect(res.status).toBe(200);
    });
    it('should update genre by the given id', async () => {
      name = 'valid name';

      await execude();

      const genre = await Genre.findById(id);

      expect(genre).toHaveProperty('name', 'valid name');
    });
    it('should place updated genre into res.body', async () => {
      name = 'valid name';

      const res = await execude();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'valid name');
    });
  });
  describe('DELETE/', () => {
    let id;
    let token;
    beforeEach(async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();
      id = genre._id;
      token = await new User().generateAuthToken();
    });
    const execude = () => {
      return request(server)
        .delete(`/api/genres/${id}`)
        .set('x-auth-token', token)
        .set('isAdmin', true);
    };

    it('should return 401 if token not provided', async () => {
      token = '';

      const res = await execude();

      expect(res.status).toBe(401);
    });
    it('should return 403 if user not admin', async () => {
      const res = await execude();

      expect(res.status).toBe(403);
    });
    it('should return 404 if genre not found', async () => {
      token = adminToken;
      id = 1;

      const res = await execude();

      expect(res.status).toBe(404);
    });
    it('should return 200 if user is admin and id is valid', async () => {
      token = adminToken;

      const res = await execude();

      expect(res.status).toBe(200);
    });
    it('should remove genre by given id if user is admin and id is valid', async () => {
      token = adminToken;

      await execude();

      expect(await Genre.findById(id)).toBeUndefined;
    });
    it('should send removed genre to the user', async () => {
      token = adminToken;

      const res = await execude();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});
