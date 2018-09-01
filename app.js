var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

const session = require('express-session');
const expressValidator = require('express-validator');

//message
const flash = require('connect-flash');
const hbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var salesRouter = require('./routes/sales');

var app = express();

mongoose.connect('mongodb://localhost:27017/sales');
let db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) => {
  console.log(err);
});



//Express session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))


//configure validator
app.use(expressValidator());

//express message middleware
app.use(flash());
app.use(function (req, res, next) {
  //res.locals.messages = require('express-messages')(req, res)();// default message template
  res.locals.messages = req.flash();
  next();
});

// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: __dirname + '/views',
    partialsDir  : [
        __dirname + '/views/partials',
    ]
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sales', salesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
