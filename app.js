/*
Huey Padua
Orange Construction
UI/UX Design
Fall 2018
*/

var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var path = require('path');
var flash = require('connect-flash');
var port = process.env.PORT || 3000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cookieParser());

// set up session middleware
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));

// Connect Flash
app.use(flash());

// Required to load stylesheets
app.use(express.static(path.join(__dirname, 'public')));


//Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/sendContact', function(req, res) {
  
});

app.post('/sendQuote', function(req, res) {
  console.log("sent request for form!");
  res.render('index');
});

var server = app.listen(port, function() {
  console.log(`Server listening on port: '${port}'`);
})
