const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(c => c.id == req.params.id);
  if (!genre) return res.status(404).send("genresby given id not found");
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find(c => c.id == req.params.id);
  if (!genre) return res.status(404).send("genre by given id not found");

  const { error } = validation(req.body);
  if (error) return res.send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`listening on port ${port}...`);
});
