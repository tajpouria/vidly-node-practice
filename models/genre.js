const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validation(value) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(value, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validation = validation;
