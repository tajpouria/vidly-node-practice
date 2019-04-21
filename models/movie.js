const { genreSchema } = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
      required: true
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      default: 0,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 255
    }
  })
);

function validation(value) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),
    genreId: Joi.objectId()
      .min(3)
      .max(255)
      .required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0)
  };
  return Joi.validate(value, schema);
}

exports.Movie = Movie;
exports.validation = validation;
