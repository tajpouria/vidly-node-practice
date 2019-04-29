const moment = require('moment');
const mongoose = require('mongoose');
const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');

describe('/api/return', () => {
  describe('POST/', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    beforeEach(async () => {
      server = require('../../index');

      customerId = mongoose.Types.ObjectId();
      movieId = mongoose.Types.ObjectId();
      token = new User().generateAuthToken();

      movie = new Movie({
        _id: movieId,
        title: '123',
        genre: {
          name: '12345'
        }
      });

      await movie.save();

      rental = new Rental({
        customer: {
          _id: customerId,
          name: '123',
          phone: '12345'
        },
        movie: {
          _id: movieId,
          title: '123',
          dailyRentalRate: 2
        }
      });
      await rental.save();
    });

    afterEach(async () => {
      server.close();
      await Rental.deleteMany({});
      await Movie.deleteMany({});
    });

    const execude = () => {
      return request(server)
        .post('/api/return')
        .set('x-auth-token', token)
        .send({ customerId, movieId });
    };

    it('should return 401 if user not logged in.', async () => {
      token = '';

      const res = await execude();

      expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
      customerId = '';

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('should return 400 if userId is not provided', async () => {
      movieId = '';

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for given customer or movie', async () => {
      await Rental.deleteMany({});

      const res = await execude();

      expect(res.status).toBe(404);
    });

    it('should return 400 if rental already processed.', async () => {
      rental.dateReturned = new Date();
      await rental.save();

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('should return 200 if we have a valid  request', async () => {
      const res = await execude();

      expect(res.status).toBe(200);
    });

    it('should set dateReturned on rental object if request is valid', async () => {
      await execude();

      const newRental = await Rental.findById(rental._id);
      const diff = new Date() - newRental.dateReturned;

      expect(diff).toBeLessThan(10 * 1000);
    });

    it('should calculate rental fee', async () => {
      rental.dateOut = moment()
        .add(-7, 'days')
        .toDate();

      await rental.save();

      const res = await execude();

      expect(res.body.rentalFee).toEqual(14);
    });
    it('should increase number of movie in stock', async () => {
      const movie = await Movie.findById(movieId);

      await execude();

      const newMovie = await Movie.findById(movieId);

      expect(newMovie.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should return rental if request is valid', async () => {
      const res = await execude();

      expect(res.body).toHaveProperty('dateOut');
      expect(res.body).toHaveProperty('dateReturned');
      expect(res.body).toHaveProperty('rentalFee');
      expect(res.body).toHaveProperty('customer');
      expect(res.body).toHaveProperty('movie');
    });
  });
});
