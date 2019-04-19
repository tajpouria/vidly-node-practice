const startUpdebug = require("debug")("app:startup");

function logger(req, res, next) {
  startUpdebug("Logging...");
  next();
}

module.exports = logger;
