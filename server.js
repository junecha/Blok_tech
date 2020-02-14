const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dotenv = require('dotenv');

const app = express();

const port = 3000;

dotenv.config();

  app.set('view engine', 'ejs')
  app.set('views', 'views')

  app.use(bodyParser.json())
  app.use('/static', express.static('static'))
  app.use(bodyParser.urlencoded( {extended: true} ))

  app.get('/', index)
  app.get('/sign-up', signUp)
  app.get('/log-in', logIn)

  app.post('/sign-up', postForm)

  app.listen(port, console.log("Listening on port " + port))


// Intialize connection to MongoDB database
  let db = null;
  const dbUri = process.env.DB_URI;
  const dbName = process.env.DB_NAME;
  const client = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect(error => {
    if (error) {
      console.log(error);
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to database")
  });

  // MongoClient.connect(dbUri, function(err, client) {
  //   db = client.db(dbName);
  // })


//Routing-----------------------------------------------------------------------

  function index(req, res) {
    res.render('index.ejs');
  }

  function signUp(req, res) {
    res.render('sign-up.ejs');
  }

  function logIn(req, res) {
    res.render('log-in.ejs');
  }

//Form posting------------------------------------------------------------------

  function postForm(req, res) {
    console.log("post received");

    let personInfo = req.body;

    let Person = {
      name: personInfo.name,
      age: personInfo.age
    };
    console.log("Person added");
  }
//Error handling----------------------------------------------------------------

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.use(function (req, res, next) {
    res.render('404.ejs');
  })
