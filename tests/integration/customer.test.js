const request = require('supertest');
const mongoose = require('mongoose');
const { Customer } = require('../../models/customer');
const adminToken = require('./adminToken');

describe('/api/customer', () => {
  let server;
  let customer;
  let customerId;
  let token;
  let name;
  let phone;
  let isGold;

  beforeEach(async () => {
    server = require('../../index');

    customerId = mongoose.Types.ObjectId();
    token = adminToken;
    (name = '123'), (phone = '12345'), (isGold = false);

    customer = new Customer({
      _id: customerId,
      name,
      phone
    });

    await customer.save();
  });
  afterEach(async () => {
    server.close();

    await Customer.deleteMany({});
  });

  describe('GET/', () => {
    const execude = () => {
      return request(server).get('/api/customers');
    };

    it('should return 404 if customer by the given id not found', async () => {
      await Customer.deleteMany({});

      const res = await execude();

      expect(res.status).toBe(404);
    });

    it('should return 200 if request is valid', async () => {
      const res = await execude();

      expect(res.status).toBe(200);
    });

    describe('GET/:id', () => {
      const execude = () => {
        return request(server).get(`/api/customers/${customerId}`);
      };

      it('should return 404 if customer by given id not found', async () => {
        customerId = '1';

        const res = await execude();

        expect(res.status).toBe(404);
      });

      it('should return 200 if request is valid', async () => {
        const res = await execude();

        expect(res.status).toBe(200);
      });
    });

    describe('POST/', () => {
      const execude = () => {
        return request(server)
          .post('/api/customers')
          .set('x-auth-token', token)
          .send({ name, phone, isGold });
      };

      it('should return if not token provided', async () => {
        token = '';

        const res = await execude();

        expect(res.status).toBe(401);
      });

      it('should return 400 if customer name is less than 3 character', async () => {
        name = '12';

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer phone is less than 5 character', async () => {
        phone = '1234';

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer name is more than 255 character', async () => {
        name = new Array(257).join('a');

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer phone is more than 255 character', async () => {
        phone = new Array(257).join('a');

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer phone is more than 255 character', async () => {
        isGold = '';

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 200 if request is valid', async () => {
        const res = await execude();

        expect(res.status).toBe(200);
      });

      it('should add the given customer into the db if request is valid', async () => {
        name = 'newName';
        phone = 'newPhone';
        isGold = true;

        await execude();
        const customer = await Customer.findOne({ name: 'newName' });

        expect(customer).toBeDefined();
      });

      it('should send customer to user', async () => {
        const res = await execude();

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', '123');
        expect(res.body).toHaveProperty('phone', '12345');
        expect(res.body).toHaveProperty('isGold', false);
      });
    });

    describe('PUT/', () => {
      const execude = () => {
        return request(server)
          .put(`/api/customers/${customerId}`)
          .set('x-auth-token', token)
          .send({ name, phone, isGold });
      };

      it('should return if not token provided', async () => {
        token = '';

        const res = await execude();

        expect(res.status).toBe(401);
      });

      it('should return 400 if customer name is less than 3 character', async () => {
        name = '12';

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer phone is less than 5 character', async () => {
        phone = '1234';

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer name is more than 255 character', async () => {
        name = new Array(257).join('a');

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer phone is more than 255 character', async () => {
        phone = new Array(257).join('a');

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 400 if customer phone is more than 255 character', async () => {
        isGold = '';

        const res = await execude();

        expect(res.status).toBe(400);
      });

      it('should return 200 if requset is valid', async () => {
        const res = await execude();

        expect(res.status).toBe(200);
      });

      it('should change the given customer into the db if request is valid', async () => {
        name = 'newName';
        phone = 'newPhone';
        isGold = true;

        await execude();
        const customer = await Customer.findOne({ name: 'newName' });

        expect(customer).toBeDefined();
      });

      it('should send edited customer to user if requset is valid', async () => {
        name = 'newName';
        phone = 'newPhone';
        isGold = true;

        const res = await execude();

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'newName');
        expect(res.body).toHaveProperty('phone', 'newPhone');
        expect(res.body).toHaveProperty('isGold', true);
      });
    });

    describe('DELETE/', () => {
      const execude = () => {
        return request(server)
          .delete(`/api/customers/${customerId}`)
          .set('x-auth-token', token);
      };
      it('should return 401 if no toke provided', async () => {
        token = '';

        const res = await execude();

        expect(res.status).toBe(401);
      });

      it('should return 404 if no customer by the given id', async () => {
        customerId = '1';

        const res = await execude();

        expect(res.status).toBe(404);
      });

      it('should return 200 request is valid', async () => {
        const res = await execude();

        expect(res.status).toBe(200);
      });

      it('should delete customer by the given id if request is valid', async () => {
        await execude();

        const customers = await Customer.find();

        expect(customers.length).toEqual(0);
      });

      it('should send deleted customer to user if request is valid', async () => {
        const res = await execude();

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', '123');
        expect(res.body).toHaveProperty('phone', '12345');
        expect(res.body).toHaveProperty('isGold', false);
      });
    });
  });
});
