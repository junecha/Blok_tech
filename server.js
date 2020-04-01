const express = require('express'); //https://expressjs.com/en/starter/installing.html
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const MongoClient = require('mongodb').MongoClient; //https://docs.atlas.mongodb.com/getting-started/
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv').config(); //https://www.npmjs.com/package/dotenv
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const passport = require('passport'); //http://www.passportjs.org/docs/authenticate/
const router = require('./routes/routes.js')
const port = 3000;

express()
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
  .use('/static', express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', router)
  .set('view engine', 'ejs')
  .set('views', 'views')
  .listen(port, () => console.log('Listening on port ' + port))

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

//Error handling---------------------------------------------------------------
express().use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

express().use((req, res, next) => {
  res.render('404.ejs');
})
