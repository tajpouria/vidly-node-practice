const auth = require('../../../middlewares/authorization');
const { User } = require('../../../models/user');
const mongoose = require('mongoose');

describe('authorization-unit', () => {
  it('should place decoded into req.user if token is valid', () => {
    const id = mongoose.Types.ObjectId().toHexString();
    const token = new User({ _id: id }).generateAuthToken();
    let req = {
      header: jest.fn().mockReturnValue(token)
    };
    let res = {};
    let next = jest.fn();
    auth(req, res, next);

    expect(req.user).toHaveProperty('_id', id);
  });
});
