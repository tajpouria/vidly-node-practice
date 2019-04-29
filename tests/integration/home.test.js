const request = require('supertest');

describe('/', () => {
  describe('GET/', () => {
    it('should 200 receiving get request', async () => {
      let server = require('../../index');

      const res = await request(server).get('/');
      expect(res.status).toBe(200);

      server.close();
    });
  });
});
