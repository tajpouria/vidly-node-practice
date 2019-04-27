const notFound = require('../middlewares/notFound');
const admin = require('../middlewares/admin');
const authorization = require('../middlewares/authorization');
const { Genre, validation } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find()
    .sort('name')
    .select('name');
  res.status(200).send(genres);
});

router.get(
  '/:id',
  notFound(async (req, res) => {
    const genre = await Genre.findById(req.params.id).select('name');
    res.send(genre);
  })
);

router.post('/', authorization, async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
  } catch (exception) {
    res.send(exception.message);
  }
});

router.put('/:id', authorization, async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).res.send(error.details[0].message);

  const result = await Genre.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name
      }
    },
    { new: true }
  );
  res.send(result);
});

router.delete(
  '/:id',
  [authorization, admin],
  notFound(async (req, res) => {
    const result = await Genre.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(result);
  })
);

module.exports = router;
