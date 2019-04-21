const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model(
  'Rental',
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          minlength: 3,
          maxlength: 50
        },
        isGold: {
          type: Boolean,
          deafult: false
        },
        phone: {
          type: String,
          require: true,
          min: 5,
          max: 50
        }
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          trim: true,
          required: true,
          minlength: 3,
          maxlength: 255
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          deafult: 0,
          min: 0,
          max: 255
        }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      default: Date.now,
      required: true
    },
    dateReturned: Date,
    rentalFee: {
      type: Number,
      min: 0
    }
  })
);

function validation(value) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    dateOut: Joi.date().min(0),
    dateReturned: Joi.date().min(0)
  };
  return Joi.validate(value, schema);
}

exports.Rental = Rental;
exports.validation = validation;
