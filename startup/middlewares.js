const startUpDebug = require('debug')('app:startUpDebug');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const errorMiddleware = require('../middlewares/errorMiddleware');

module.exports = function(app) {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    startUpDebug('morgan is enabled... ');
  }

  app.use(errorMiddleware);
};
