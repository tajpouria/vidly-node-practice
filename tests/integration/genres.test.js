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
  describe('POST /', () => {
    let token;
    let genre;

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
      token = await new User().generateAuthToken();
      genre = '1234';
      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('Should return 400 when genre name is more than 50 character', async () => {
      token = await new User().generateAuthToken();
      genre = new Array(52).join('a');
      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('Should save the genres req is valid', async () => {
      token = await new User().generateAuthToken();
      genre = 'genre1';
      const res = await execude();

      expect(res.status).toBe(200);
      expect(await Genre.findOne({ name: 'genre1' })).not.toBeNull();
    });
    it('Should return genre if req is valid', async () => {
      token = await new User().generateAuthToken();
      const res = await execude();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});
