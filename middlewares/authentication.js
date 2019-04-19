const startUpDebug = require("debug")("app:startup");

function auth(req, res, next) {
  startUpDebug("Authenticating...");
  next();
}

module.exports = auth;
