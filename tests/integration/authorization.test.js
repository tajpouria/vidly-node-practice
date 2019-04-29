const request = require('supertest');

describe('authorization-integration', () => {
  let server;
  let token;

  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
  });

  const execude = () => {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', token);
  };

  it('should return 401 if no token perovide', async () => {
    token = '';

    const res = await execude();

    expect(res.status).toBe(401);
  });
  it('should return 400 if token is invalid', async () => {
    token = '1';

    const res = await execude();

    expect(res.status).toBe(400);
  });
});
