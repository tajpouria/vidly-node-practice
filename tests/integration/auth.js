/* eslint-disable no-undef */
const request = require('supertest');
const { User } = require('../../models/user');

describe('authorizaron middleware', () => {
  beforeEach(() => {
    server = require('../../index');
  });

  afterEach(() => {
    server.close();
  });

  let token;

  const execude = () => {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1' });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should reaturn 401 if no token provided', async () => {
    token = '';
    const res = await execude();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid ', async () => {
    token = '1';
    const res = await execude();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    token = new User().generateAuthToken();
    const res = await execude();

    expect(res.status).toBe(200);
  });
});
