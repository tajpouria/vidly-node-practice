const Genre = require("../models/genre");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.get("/", async (req, res) => {
  const genres = await Genre.find()
    .sort("name")
    .select("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id).select("name");
    res.send(genre);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).res.send(error.details[0].message);

  try {
    const genre = await Genre.findOneAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name
        }
      },
      { new: true }
    );
    res.send(genre);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(genre);
  } catch (exeption) {
    res.status(404).send(exeption.message);
  }
});

function validation(value) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(value, schema);
}

module.exports = router;
