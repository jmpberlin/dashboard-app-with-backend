var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// HEROKU BUILD:
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(express.static(path.join(__dirname, 'public')));

// DB CONNECTION

require('./config/db');

const indexRouter = require('./routes/index');
app.use('/api/', indexRouter);
const usersRouter = require('./routes/users');
app.use('/api/user', usersRouter);
const twitterRouter = require('./routes/twitter');
app.use('/api/twitter', twitterRouter);

// HEROKU BUILD ( Important to put before Error handler)
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + '/client/build/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
