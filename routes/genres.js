const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(c => c.id == req.params.id);
  if (!genre) return res.status(404).send("genresby given id not found");
  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find(c => c.id == req.params.id);
  if (!genre) return res.status(404).send("genre by given id not found");

  const { error } = validation(req.body);
  if (error) return res.send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(c => c.id == req.params.id);
  if (!genre) return res.status(404).send("genre by given id not found");

  genres.splice(parseInt(req.params.id) - 1, 1);
  res.send(genre);
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
