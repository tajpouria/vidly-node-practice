const request = require('supertest');
const adminToken = require('./adminToken');
const { Rental } = require('../../models/rental');
const { Customer } = require('../../models/customer');
const { Movie } = require('../../models/movie');
const { Genre } = require('../../models/genre');
const mongoose = require('mongoose');

describe('/api/rentals', () => {
  let server;
  let token;
  let name;
  let phone;
  let title;
  let rentalId;
  let customerId;
  let movieId;

  beforeEach(async () => {
    server = require('../../index');

    const createObjectId = mongoose.Types.ObjectId();

    token = adminToken;
    name = '123';
    phone = '12345';
    title = '123';
    rentalId = createObjectId;
    customerId = createObjectId;
    movieId = createObjectId;

    const rental = new Rental({
      _id: rentalId,
      customer: {
        name,
        phone
      },
      movie: {
        title
      }
    });
    await rental.save();

    const customer = new Customer({
      _id: customerId,
      name,
      phone
    });
    await customer.save();

    const movie = new Movie({
      _id: movieId,
      title,
      genre: {
        name: '12345'
      },
      numberInStock: 1
    });
    await movie.save();

    const genre = new Genre({
      name: '12345'
    });
    genre.save();
  });
  afterEach(async () => {
    server.close();

    await Rental.deleteMany({});
    await Customer.deleteMany({});
    await Movie.deleteMany({});
    await Genre.deleteMany({});
  });

  describe('GET/', () => {
    const execute = () => {
      return request(server)
        .get('/api/rentals')
        .set('x-auth-token', token);
    };

    it('should return 401 if no token provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return 404 if not rental available', async () => {
      await Rental.deleteMany({});

      const res = await execute();

      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });

    it('should send all rentals', async () => {
      const res = await execute();

      expect(res.body.length).not.toEqual(0);
    });
  });

  describe('GET/:id', () => {
    const execute = () => {
      return request(server)
        .get(`/api/rentals/${rentalId}`)
        .set('x-auth-token', token);
    };

    it('should return 401 if no token provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return 404 if not rental available by given id', async () => {
      rentalId = '1';

      const res = await execute();

      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });

    it('should send rental if request is valid', async () => {
      const res = await execute();

      expect(res.body).toHaveProperty('customer');
      expect(res.body).toHaveProperty('movie');
      expect(res.body).toHaveProperty('dateOut');
    });
  });

  describe('POST/', () => {
    beforeEach(async () => {
      await Rental.deleteMany({});
    });

    const execute = () => {
      return request(server)
        .post(`/api/rentals`)
        .set('x-auth-token', token)
        .send({ customerId, movieId });
    };

    it('should return 401 if no token provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return 400 if no customer found by the given id', async () => {
      await Customer.deleteMany({});

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if no movie found by the given id', async () => {
      await Movie.deleteMany({});

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if movie.numberInStock is zero', async () => {
      await Movie.findOneAndUpdate({ _id: movieId }, { numberInStock: 0 });

      const res = await execute();

      expect(res.status).toBe(400);
    });

    //should return 500 if cannot save rental
    //should return 500 if cannot decrease movie.numberInStock

    it('should return 200 if request is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });
    it('should save rental in db if request is valid', async () => {
      await execute();

      const rental = await Rental.find();
      expect(rental.length).not.toEqual(0);
    });

    it('should decrease movie number in stock if request is valid', async () => {
      await execute();

      const movie = await Movie.findById(movieId);
      expect(movie.numberInStock).toEqual(0);
    });

    it('should send rental if request is valid', async () => {
      const res = await execute();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('customer');
      expect(res.body).toHaveProperty('movie');
    });
  });
});
