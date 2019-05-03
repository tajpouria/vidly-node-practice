const admin = require('../middlewares/admin');
const authorization = require('../middlewares/authorization');
// const Fawn = require('fawn');
// const mongoose = require('mongoose');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Rental } = require('../models/rental');
const express = require('express');
const router = express.Router();

// Fawn.init(mongoose);
// let task = Fawn.Task();

router.get('/', authorization, async (req, res) => {
  await Rental.find({}, (err, doc) => {
    if (doc.length === 0) return res.status(404).send('not found');

    res.send(doc);
  }).select('customer movie dateOut');
});

router.get('/:id', authorization, async (req, res) => {
  await Rental.findById(req.params.id, {}, (err, doc) => {
    if (err) return res.status(404).send('not found');

    res.send(doc);
  }).select('customer movie dateOut');
});

router.post('/', authorization, async (req, res) => {
  const customer = await Customer.findById(
    req.body.customerId,
    {},
    (err, doc) => {
      if (doc === null) return res.status(400).send('Customer not found');
    }
  );
  const movie = await Movie.findById(req.body.movieId, {}, (err, doc) => {
    if (doc === null) return res.status(400).send('Movie not found');

    if (doc.numberInStock === 0)
      return res.status(400).send("Sorry we don't have movie in our stock!");
  });

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
    // task
    //   .save('rentals', rental)
    //   .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
    //   .run();
    await rental.save();
    await Movie.findOneAndUpdate(
      { _id: movie._id },
      { $inc: { numberInStock: -1 } }
    );
    res.send(rental);
  } catch (exception) {
    res.status(500).send(exception.message);
  }
});

router.delete('/:id', [authorization, admin], async (req, res) => {
  try {
    const result = await Rental.findOneAndDelete({ _id: req.params.id });
    res.send(result);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

module.exports = router;
