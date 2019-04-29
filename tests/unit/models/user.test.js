const { User } = require('../../../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', () => {
  it('Should return a valid jwt by the given payload', () => {
    const payload = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: false
    };
    const user = new User(payload);
    const token = jwt.verify(
      user.generateAuthToken(),
      config.get('jwtPrivateKey')
    );
    expect(token).toMatchObject(payload);
  });
});
