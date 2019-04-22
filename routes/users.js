const authorization = require('../middlewares/authorization');
const bctypt = require('bcrypt');
const _ = require('lodash');
const { User, validation, passwordValidation } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', authorization, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).send(user);
});

router.post('/', async (req, res) => {
  const { error } =
    validation(req.body) && passwordValidation(req.body.password);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    const userInf = _.pick(req.body, ['name', 'email']);
    const password = await bctypt.hash(
      req.body.password,
      await bctypt.genSalt()
    );

    user = new User({ ...userInf, password });
    await user.save();

    res
      .status(200)
      .header('x-auth-token', user.generateAuthToken())
      .send(`${JSON.stringify(userInf)} created succesfully.`);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

module.exports = router;
