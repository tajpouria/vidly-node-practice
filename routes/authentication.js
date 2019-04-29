const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).send('Invalid email or password.');

  res.header('x-auth-token', user.generateAuthToken()).send(user);
});

function validation(value) {
  const schema = {
    email: Joi.string()
      .min(10)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required()
  };

  return Joi.validate(value, schema);
}

module.exports = router;
