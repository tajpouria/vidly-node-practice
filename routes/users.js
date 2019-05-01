const passValidator = require('../middlewares/passwordValidator');
const validator = require('../middlewares/validator');
const admin = require('../middlewares/admin');
const authorization = require('../middlewares/authorization');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validation, passwordValidation } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', authorization, async (req, res) => {
  await User.findById(req.user._id, (err, doc) => {
    res.send(doc);
  }).select('-password');
});

router.post(
  '/',
  [
    authorization,
    admin,
    validator(validation),
    passValidator(passwordValidation)
  ],
  async (req, res) => {
    let user = await User.findOne(
      { email: req.body.email },
      {},
      {},
      (err, doc) => {
        if (doc) return res.status(400).send('User already registered.');
      }
    );

    const userInf = _.pick(req.body, ['name', 'email']);
    const password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt()
    );

    user = new User({ ...userInf, password });
    await user.save();

    res.header('x-auth-token', user.generateAuthToken()).send(userInf);
  }
);

module.exports = router;
