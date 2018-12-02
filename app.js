var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = express.Router();
var trains=[
  {number:'16316',name:'BANGALORE EXP',TotalSeats:120,AvailableSeats:120,fare:'₹585.00'},
  {number:'16319',name:'BAND HUMSAFAR',TotalSeats:180,AvailableSeats:180,fare:'₹770.00'},
  {number:'11014',name:'LOKMANYA TT EXP',TotalSeats:140,AvailableSeats:140,fare:'₹640.00'},
  {number:'22666',name:'CBE SBC UDAY EXP',TotalSeats:210,AvailableSeats:210,fare:'₹610.00'},
  {number:'22678',name:'KCVL YPR AC EXP',TotalSeats:120,AvailableSeats:120,fare:'₹745.00'}

]

router.get('/',function(req,res,next){
  res.render('index',{title:'Parthu\'s Train Ticketing app'});
});

router.get('/train',function(req,res,next){
  res.render('train',{count:trains.length,trains:trains});
});
router.post('/train',function(req,res,next){
  console.log(Object.keys(req.body)[0]);
  check=Object.keys(req.body)[0];
  for (train in trains)
  {
    if (trains[train].name==check)
    {
      console.log(trains[train].name);
      trains[train].AvailableSeats-=1;
    }
  }
  res.render('train',{count:trains.length,trains:trains});
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

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
