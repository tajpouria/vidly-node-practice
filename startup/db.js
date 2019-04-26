const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('database');
  mongoose
    .connect(config.get('database'), {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => {
      winston.info(`Connected to ${db}`);
    });
};
