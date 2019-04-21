const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Rental, validation } = require('../models/rental');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  res.status(200).send(await Rental.find().select('customer movie dateOut'));
});

router.get('/:id', async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).select(
      'customer movie dateOut'
    );
    res.status(200).send(rental);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.post('/', async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findById(req.body.customerId);

    const movie = await Movie.findById(req.body.movieId);

    if (movie.numberInStock === 0)
      return res.status(400).send("Sorry we don't have movie in our stock!");

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });

    try {
      new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
        .run();

      res.status(200).send(`${rental} was craeted succesfully.`);
    } catch (exception) {
      res.status(500).send(exception.message);
    }
  } catch (exception) {
    res.send(404).send(exception.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Rental.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(`${result} was deleted succesfully`);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

module.exports = router;
