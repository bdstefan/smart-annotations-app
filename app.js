const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const basicAuth    = require('express-basic-auth');
const mongoose     = require('mongoose');

let indexRouter       = require('./routes/index');
let annotationsRouter = require('./routes/annotations');
let userRouter        = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(basicAuth({
  users: { 'admin': 'supersecret' }, //Authorization Basic YWRtaW46c3VwZXJzZWNyZXQ=
  challenge: true,
  realm: 'HaK12trL9P10hue',
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/annotations', annotationsRouter);
app.use('/users', userRouter);

try {
  mongoose.connect('mongodb://mongo:27017/smart_annotations', {useNewUrlParser: true});
} catch (error) {
  next(createError(error));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({message: 'The cat is sleepy now. Pur pur pur! ' + err.message})
});

module.exports = app;
