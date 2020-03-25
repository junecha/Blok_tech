const express = require('express'); //https://expressjs.com/en/starter/installing.html
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const MongoClient = require('mongodb').MongoClient; //https://docs.atlas.mongodb.com/getting-started/
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv').config(); //https://www.npmjs.com/package/dotenv
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const passport = require('passport'); //http://www.passportjs.org/docs/authenticate/
const port = 3000;

//'Self made' packages---------------------------------------------------------
require('./control/passport.js')
const createUser = require('./control/createuser.js');
const app = express()

express()
  .use('/static', express.static('static'))
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: false,
    cookie: {
      maxAge: 1000000
    }
  }))
  .use(passport.initialize())
  .use(passport.session())
  .get('/', index)
  .get('/sign-up', signUp)
  .get('/log-in', logIn)
  .get('/user', userPage)
  .get('/logout', logOut)
  .set('view engine', 'ejs') //Set template engine
  .set('views', 'views') //Give acces to views
  .post('/sign-up', createUser)
  .post('/log-in', passport.authenticate('local', { failureRedirect: '/log-in', }), authCheck)
  .listen(port, () => console.log('Listening on port ' + port))

//Connect with the database----------------------------------------------------
let db = null;

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect (err => {
  if (err) {
    console.log (err);
    throw err;
  }
  db = client.db (dbName);
  console.log('Connected to database');
});

//Routing----------------------------------------------------------------------
function index (req, res) {
  res.render('index.ejs');
}

function signUp (req, res) {
  res.render('sign-up.ejs');
}

function logIn (req, res) {
  res.render('log-in.ejs');
  // console.log(req.session);
}

function authCheck (req, res) {
  console.log('redirecting to /user')
  res.redirect('/user');
}

function userPage (req, res) {
  if (req.user) {
    res.render('user.ejs', { //Give the template engine these req from the database
      name: req.user.name,
      lastname: req.user.lastname,
      age: req.user.age,
      email: req.user.email,
      gender: req.user.gender,
      preference: req.user.preference,
      interests: req.user.interests
    });
    console.log('Session = ', req.session.passport.user.name)
  } else { //Authenticate if the user is logged in, if not return to log in
    console.log('redirecting to / anyway ')
    res.redirect('/');
  }
}

function logOut (req, res) {
  req.logout();
  res.redirect('/');
}

//Error handling---------------------------------------------------------------
express().use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

express().use((req, res, next) => {
  res.render('404.ejs');
})
