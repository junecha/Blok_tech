const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(session({
  'secret': 'secret1234'
}));

dotenv.config();

app.set('view engine', 'ejs')
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
  res.render('user.ejs');
});

app.listen(port, () => console.log('Listening on port ' + port))

//'Self made' packages---------------------------------------------------------
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
