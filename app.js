require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Transformer = require('./transformer/Transformer');
const setUser = require('./utils/setUser');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(async (req, res, next) => {
  // Set transformer.
  res.transformer = new Transformer(res);

  // Set user req object.
  await setUser(req);

  next();
});

app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.use((req, res) => res.transformer.fail('Route not found.', null, 404));

module.exports = app;
