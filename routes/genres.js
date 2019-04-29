const admin = require('../middlewares/admin');
const authorization = require('../middlewares/authorization');
const { Genre, validation } = require('../models/genre');
const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator');

router.get('/', async (req, res) => {
  const genres = await Genre.find()
    .sort('name')
    .select('name');
  res.status(200).send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id, error => {
    if (error) return res.status(404).send('not found');
  }).select('name');

  res.status(200).send(genre);
});

router.post('/', [authorization, validator(validation)], async (req, res) => {
  try {
    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
  } catch (exception) {
    res.send(exception.message);
  }
});

router.put('/:id', [authorization, validator(validation)], async (req, res) => {
  try {
    const genre = await Genre.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name
        }
      },
      { new: true }
    );
    res.send(genre);
  } catch (ex) {
    res.status(404).send('not found');
  }
});

router.delete('/:id', [authorization, admin], async (req, res) => {
  try {
    const genre = await Genre.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(genre);
  } catch (ex) {
    res.status(404).send('not found');
  }
});

module.exports = router;
