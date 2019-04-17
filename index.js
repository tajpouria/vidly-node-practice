const debug = require("debug")("app:debug");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const Joi = require("joi");
const app = express();
const logger = require("./middlewares/logger");
const auth = require("./middlewares/authentication");
const home = require("./routes/home");
const genres = require("./routes/genres");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(auth);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  debug("morgan is enabled... ");
}
app.use("/", home);
app.use("/api/genres", genres);

app.set("view engine", "pug");
app.set("views", "./views");

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  debug(`listening on port ${port}...`);
});
