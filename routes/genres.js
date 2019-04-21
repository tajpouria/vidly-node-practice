const { Genre, validation } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find()
    .sort('name')
    .select('name');
  res.status(200).send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id).select('name');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).res.send(error.details[0].message);

  try {
    const genre = new Genre({ name: req.body.name });
    const result = await genre.save();
    res.send(`${result} was created succesfully!`);
  } catch (exception) {
    res.send(exception.message);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).res.send(error.details[0].message);

  try {
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
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Genre.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(result);
  } catch (exeption) {
    res.status(404).send(exeption.message);
  }
});

module.exports = router;
