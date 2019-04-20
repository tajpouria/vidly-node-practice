const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    }
  })
);

function validation(value) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(value, schema);
}

exports.Genre = Genre;
exports.validation = validation;
