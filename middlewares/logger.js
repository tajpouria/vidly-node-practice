const debug = require("debug")("app:debug");

function logger(req, res, next) {
  debug("Logging...");
  next();
}

module.exports = logger;
