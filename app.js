var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose')
var cors = require('cors')
var bodyparser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//db connection
mongoose.connect('mongodb://localhost:27017/bank')

mongoose.connection.on('connected',()=>{
    // console.log('connected to db mongodb @ 27017')
})
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in an database connection'+err)
    }
})
//db connection end

app.use(cors())
app.use(bodyparser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
