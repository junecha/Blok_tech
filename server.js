const express = require('express'); //https://expressjs.com/en/starter/installing.html
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const MongoClient = require('mongodb').MongoClient; //https://docs.atlas.mongodb.com/getting-started/
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv').config(); //https://www.npmjs.com/package/dotenv
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const passport = require('passport'); //http://www.passportjs.org/docs/authenticate/

const {
  check,
  validationResult
} = require('express-validator')
const app = express();
const port = 3000;

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUnitialized:  false,
  cookie: {maxAge: 5000,}
}));

app.use(passport.initialize());
app.use(passport.session());
//Set template engine
app.set('view engine', 'ejs')
//Give acces to views
app.set('views', 'views')

app.use(bodyParser.json())
app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({
  extended: true
}))

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
  console.log('Connected to database')
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
})

app.get('/user', (req, res) => {
  res.render('user.ejs', { name: req.user.name});
});

app.post('login', passport.authenticate('local', {
  succesRedirect: '/',
  failureRedirect: '/login'
}))

app.listen(port, () => console.log('Listening on port ' + port))

//'Self made' packages---------------------------------------------------------
const createUser = require('./control/createuser.js');
const logIn = require('./control/login.js');

app.post('/sign-up', createUser);
app.post('/log-in', logIn);

//Error handling---------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

app.use((req, res, next) => {
  res.render('404.ejs');
})
