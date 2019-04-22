const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validation(value) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(value, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validation = validation;
