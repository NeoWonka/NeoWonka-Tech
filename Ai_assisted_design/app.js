var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// NOTE: no view engine — serving static HTML files instead
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve public static assets
app.use(express.static(path.join(__dirname, 'public')));

// Optional explicit mappings (helps rule out static-routing issues)
app.use('/stylesheets', express.static(path.join(__dirname, 'public', 'stylesheets')));
app.use('/javascripts', express.static(path.join(__dirname, 'public', 'javascripts')));

// Expose views directory so static HTML can be reached if needed
app.use('/views', express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler — send static error page when available, fallback to text
app.use(function(err, req, res, next) {
  // provide minimal locals for possible logging or middleware
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  var status = err.status || 500;
  res.status(status);

  var errorPage = path.join(__dirname, 'views', 'error.html');

  res.sendFile(errorPage, function(sendErr) {
    if (sendErr) {
      // If sending the static file fails, fall back to plain text.
      if (req.app.get('env') === 'development') {
        res.type('txt').send((err.stack || err.message) + '\n');
      } else {
        res.type('txt').send(err.message || 'Server error');
      }
    }
  });
});

module.exports = app;
