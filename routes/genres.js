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
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("404 not found !");
  res.send(genre);
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

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  });
  if (!genre) return res.status(404).send("genre by given id not found");
});

router.delete("/:id", (req, res) => {
  const genre = Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("genre by given id not found");
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
