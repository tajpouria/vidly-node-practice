const admin = require('../middlewares/admin');
const authorization = require('../middlewares/authorization');
const { Genre } = require('../models/genre');
const { validation, Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(
    await Movie.find()
      .sort('title')
      .select('title genre numberInStock dailyRentalRate')
  );
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).select(
      'name genre numberInStock dailyRentalRate'
    );
    res.status(200).send(movie);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.post('/', authorization, async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { title, genreId, numberInStock, dailyRentalRate } = req.body;

    const genre = await Genre.findById(genreId);
    const movie = new Movie({
      title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock,
      dailyRentalRate
    });
    const result = await movie.save();
    return res.status(200).send(`${result} created succesfully.`);
  } catch (exception) {
    res.send(exception.message);
  }
});

router.put('/:id', authorization, async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { title, genreId, numberInStock = 0, dailyRentalRate = 0 } = req.body;
    const genre = await Genre.findById(genreId);
    const genre_id = genre._id;
    const genreName = genre.name;
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title,
          'genre._id': genre_id,
          'genre.name': genreName,
          numberInStock,
          dailyRentalRate
        }
      },
      { new: true }
    );
    res.status(200).send(movie);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.delete('/:id', [authorization, admin], async (req, res) => {
  try {
    const result = await Movie.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(`${result} was deleted succesfully.`);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

module.exports = router;
