const express = require('express'); //https://expressjs.com/en/starter/installing.html
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const MongoClient = require('mongodb').MongoClient; //https://docs.atlas.mongodb.com/getting-started/
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv').config(); //https://www.npmjs.com/package/dotenv
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const passport = require('passport'); //http://www.passportjs.org/docs/authenticate/

const app = express();
const port = 8000;

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUnitialized: false,
  cookie: {
    maxAge: 1000000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

//Set template engine
app.set('view engine', 'ejs');

//Give acces to views
app.set('views', 'views');

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//Connect with the database----------------------------------------------------
let db = null;

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  if (err) {
    console.log(err);
    throw err;
  }
  db = client.db(dbName);
  console.log('Connected to database');
});

//Routing----------------------------------------------------------------------
app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.get('/sign-up', (req, res) => {
  res.render('sign-up.ejs');
})

app.get('/log-in', (req, res) => {
  res.render('log-in.ejs');
  // console.log(req.session);
})

app.get('/user', (req, res) => {
  if(req.user) {
    res.render('user.ejs', { //Give the template engine these req from the database
      name: req.user.name,
      lastname: req.user.lastname,
      age: req.user.age,
      email: req.user.email,
      gender: req.user.gender,
      preference: req.user.preference,
      interests: req.user.interests
    });
    console.log('Session = ',req.session.passport.user.name)
  } else { //Authenticate if the user is logged in, if not return to log in
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

app.post('/log-in', passport.authenticate('local', {
  failureRedirect: '/log-in'
}), (req, res) => {
  res.redirect('/user');
})

app.listen(port, () => console.log('Listening on port ' + port))

//'Self made' packages---------------------------------------------------------
require('./control/passport.js');
const createUser = require('./control/createuser.js');

app.post('/sign-up', createUser);


//Error handling---------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

app.use((req, res, next) => {
  res.render('404.ejs');
})
