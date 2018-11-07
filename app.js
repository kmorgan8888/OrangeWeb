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

app.post('/send_quote', function(req, res) {

  var name = req.body.name,
  email = req.body.email,
  phone = req.body.phone,
  workType = req.body.workType,
  budget = req.body.budget,
  message = req.body.message;
  sgMail = require('@sendgrid/mail');
  console.log("Quote Form received")
  console.log(name+"\n"+email+"\n"+phone+"\n"+workType+"\n"+budget+"\n"+message);

  // using SendGrid to process quote form to server
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    var msg = {
    // to be changed to client's email
    to: 'hgpadua@knights.ucf.edu',
    from: email,
    subject: 'Quote Form received from Orange Construction Website',
    text: `Name: ${name},
          Phone: ${phone},
          Work Type: ${workType},
          Budget: ${budget},
          Message: ${message}`,
  };
  sgMail.send(msg);
  console.log("message sent using sendgrid");
  res.render('index');
});

var server = app.listen(port, function() {
  console.log(`Server listening on port: '${port}'`);
})
