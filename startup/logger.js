// const config = require('config');
const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  process.on('uncaughtException', ex => {
    winston.error(ex.message, ex);
    process.exit(1);
  });
};

process.on('unhandledRejection', ex => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(winston.transports.File, { filename: 'logFile.log' });
// winston.add(winston.transports.MongoDB, {
//     db: config.get('database'),
//     level: 'info'
//   });
// }
