var express = require('express'); //Source: https://expressjs.com/
var bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
var MongoClient = require('mongodb').MongoClient; //Source: https://www.npmjs.com/package/mongodb
var ObjectId = require('mongodb').ObjectId
var dotenv = require('dotenv');
var session = require('express-session');
var validator = require('express-validator');
var port = 3000;


//Database----------------------------------------------------------------------


dotenv.config();
var db;
var dbUrl = process.env.DB_URI;
var dbName = process.env.DB_NAME;
var dbSecret = process.env.SESSION_SECRET
var client = new MongoClient(dbUrl, { useNewUrlParser: true });

// client.connect(error => {
//   if (error) {
//     console.log(error);
//     throw error;
//   }
//   db = client.db(dbName);
// });

MongoClient.connect(dbUrl, function(err, client) {
  db = client.db(dbName);
})


//Express server----------------------------------------------------------------


express()


  .set('view engine', 'ejs')
  .set('views', 'views')


  //'give' access to the static folder
  .use(bodyParser.json())
  .use('/static', express.static('static'))
  .use(bodyParser.urlencoded( {extended: true} ))
  // .use(session({secret: dbSecret, saveUninitialized: false, resave: false}))


  //Make routes to different pages.  Method(path, handler) (Don't forget to actualy create the handler)
  .get('/', index)
  .get('/sign-up', signUp)
  .get('/profile', profile)
  .get('/interest', interest)
  .get('/log-in', logIn)


  .get('/sign-up', getFormData)
  // .get('/log-in'), logIn)


  .post('/', addUser)


  //This listens to the var port. var port usually holds 8000 or 3000. (match localhost:'port' to the number stated at the top)
  .listen(port, console.log("Listening on port " + port))


//Routing-----------------------------------------------------------------------


function index(req, res) {
  res.render('index.ejs');
}

function signUp(req, res) {
  res.render('sign-up.ejs');
}

function profile(req, res) {
  res.render('profile.ejs');
}

function interest(req, res) {
  res.render('interest.ejs');
}

function logIn(req, res) {
  res.render('log-in.ejs');
}


//------------------------------------------------------------------------------


//Get data from the form that the user sends
function getFormData(req, res) {
  var userInfo = [];
  mongo.connect(dbUrl, function(err, db) {
    var cursor = db.collection('users').find();
    cursor.forEach(function(doc, err) {
      userInfo.push(doc);
    }, function() {
      res.render('index.ejs', {
        person: userInfo
      });
    });
  })
}

//Push data from the form into the database
function addUser(req, res) {
  var person = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    interest: req.body.interest
  };

  db.collection("users").insertOne(person, (err, person) => {
    console.log("Item inserted");
    res.redirect("/");
  })
}
