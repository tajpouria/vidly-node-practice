const debug = require("debug")("app:debug");

function auth(req, res, next) {
  debug("Aithenticating...");
  next();
}

module.exports = auth;
