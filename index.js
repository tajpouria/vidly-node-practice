const config = require('config');
const mongoose = require('mongoose');
const dbDebug = require('debug')('app:db');
const startUpDebug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const auth = require('./middlewares/authentication');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(auth);

mongoose
  .connect(config.get('database.host'), { useNewUrlParser: true })
  .then(() => {
    dbDebug('Connected to Mongodb..');
  })
  .catch(err => `Could not connect to db ${err.messge}`);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
  startUpDebug('morgan is enabled... ');
}
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

app.set('view engine', 'pug');
app.set('views', './views');

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  startUpDebug(`listening on port ${port}...`);
});
