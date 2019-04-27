/* eslint-disable no-undef */
const auth = require('../../../middlewares/authorization');
const { User } = require('../../../models/user');

describe('authorization middleware-unitTest', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });
  it('it should populate req.body by _id', async () => {
    const token = await new User().generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);

    // expect(req.user).toHaveProperty('_id');
  });
});
