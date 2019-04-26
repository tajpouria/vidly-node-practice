/* eslint-disable no-undef */
let server;
const winston = require('winston');
const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });
  describe('GET /', () => {
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
  describe('GET /:id', () => {
    it('should return the genre by given id.', async () => {
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
  describe('POST /', () => {
    it('should return 401 when user not logged in.', async () => {
      res = await request(server)
        .post('/api/genres')
        .send({ name: 'genre1' });
      expect(res.status).toBe(401);
    });
    it('should return 400 if name of genre less than 5 character', async () => {
      const user = new User({
        name: 'name1',
        email: 'email1@gmail.com',
        password: 'a3456'
      });
      const token = user.generateAuthToken();
      const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: '12' });

      expect(res.status).toBe(400);
    });
  });
});
