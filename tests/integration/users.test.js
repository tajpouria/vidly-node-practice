const request = require('supertest');
const adminToken = require('./adminToken');
const { User } = require('../../models/user');

describe('/api/users', () => {
  let server;
  let token;
  let name;
  let email;
  let password;
  beforeEach(() => {
    server = require('../../index');

    token = adminToken;
    name = '123';
    email = 'email@gmail.com';
    password = 'a123456B';
  });

  const execute = () => {
    return request(server)
      .post('/api/users')
      .set('x-auth-token', token)
      .send({ name, email, password });
  };

  afterEach(async () => {
    server.close();

    await User.deleteMany({});
  });

  describe('GET/me', () => {
    it('should return 401 if no token provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return 200 if request is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });

    it('should send user if request is valid', async () => {
      const res = await execute();

      expect(res.body).toMatchObject({
        name: '123',
        email: 'email@gmail.com'
      });
    });
  });

  describe('POST/', () => {
    it('should return 401 if not token provided', async () => {
      token = '';

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return 400 if user name is less than 3 character', async () => {
      name = '12';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user email is less than 10 character', async () => {
      email = '123456789';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user name is more than 50 character', async () => {
      name = new Array(257).join('52');

      const res = await execute();

      expect(res.status).toBe(400);
    });
    it('should return 400 if user email is more than 255 character', async () => {
      email = new Array(257).join('a');

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user password is less than 8 character', async () => {
      password = 'a12345B';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user password is more than 30 character', async () => {
      password = new Array(12).join('A1b');

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user password does not contain at least one lowerCase character', async () => {
      password = 'A123456B';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user password does not contain at least one UpperCase character', async () => {
      password = 'a123456b';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user password does not contain at least one numeric character', async () => {
      password = 'Abbbbbb';

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return 400 if user already exist by given email', async () => {
      const user = new User({ name, email });
      await user.save();

      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should save the user if request is valid', async () => {
      await execute();

      const user = await User.findOne({ email });

      expect(user).toHaveProperty('_id');
      expect(user).toHaveProperty('name', '123');
      expect(user).toHaveProperty('email', 'email@gmail.com');
      expect(user).toHaveProperty('password');
    });

    it('should return 200 if request is valid', async () => {
      const res = await execute();

      expect(res.status).toBe(200);
    });
    it('should send userInfo if request is valid', async () => {
      const res = await execute();

      expect(res.body).toMatchObject({ name: '123', email: 'email@gmail.com' });
    });
  });
});
