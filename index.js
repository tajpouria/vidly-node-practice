const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/logger')();
require('./startup/middlewares')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();
require('./startup/views')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () => {
  winston.info(`listening on port ${port}...`);
});
