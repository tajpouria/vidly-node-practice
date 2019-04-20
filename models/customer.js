const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlenght: 255
    },
    isGold: {
      type: Boolean,
      default: false
    }
  })
);

function validation(value) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(255)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(value, schema);
}

exports.Customer = Customer;
exports.validation = validation;
