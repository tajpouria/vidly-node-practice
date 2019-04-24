const startUpDebug = require('debug')('app:startUpDebug');
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/logger')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/middlewares')(app);
require('./startup/validation')();
require('./startup/views')(app);

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  startUpDebug(`listening on port ${port}...`);
});
