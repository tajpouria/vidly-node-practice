const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/', [authorization, validator(validation)], async (req, res) => {
  validator(validation);

  const { customerId, movieId } = req.body;

  const rental = await Rental.lookUp(customerId, movieId);
  if (!rental) return res.status(404).send('not found');

  if (rental.dateReturned)
    return res.status(400).send('Rental already processed');

  rental.return();
  await rental.save();

  await Movie.update({ _id: movieId }, { $inc: { numberInStock: 1 } });

  res.send(rental);
});

function validation(value) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(value, schema);
}

module.exports = router;
