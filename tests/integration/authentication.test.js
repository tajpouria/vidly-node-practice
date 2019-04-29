const request = require('supertest');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');

describe('/auth', () => {
  describe('POST/', () => {
    let server;
    let email;
    let password;

    beforeEach(async () => {
      server = require('../../index');

      email = 'email@gmail.com';

      password = await bcrypt.hash('a123456B', await bcrypt.genSalt(10));

      const user = new User({
        name: '123',
        email,
        password
      });

      await user.save();
    });
    afterEach(async () => {
      server.close();
      await User.deleteMany({});
    });

    const execude = () => {
      return request(server)
        .post('/api/auth')
        .send({ email, password });
    };

    it('should return 400 if email less than 10 character', async () => {
      email = '12346789';

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password less than 8 character', async () => {
      password = '123467';

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('should return 400 if email more than 255 character', async () => {
      email = new Array(257).join('a');

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password more than 1024 character', async () => {
      password = new Array(1026).join('a');

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user by the given email not found', async () => {
      await User.deleteMany({});

      const res = await execude();

      expect(res.status).toBe(400);
    });
    it('should return 400 if password is not correct', async () => {
      password = 'invalid password';

      const res = await execude();

      expect(res.status).toBe(400);
    });

    it('return 200 if requset is valid', async () => {
      password = 'a123456B';

      const res = await execude();

      expect(res.status).toBe(200);
    });

    //TODO
    // it('should place token in x-auth-token if request is valid', async () => {
    //   const res = await execude();

    //   expect(res.header).toHaveProperty('x-auth-token');
    // });

    it('should send specific string if request is valid', async () => {
      password = 'a123456B';

      const res = await execude();

      expect(res.body).toHaveProperty('name');
    });
  });
});
