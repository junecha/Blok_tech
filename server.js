const express = require('express');
const bodyParser = require('body-parser');

const app = express();

  app.set('view engine', 'ejs')
  app.set('views', 'views')

  app.use(bodyParser.json())
  app.use('/static', express.static('static'))
  app.use(bodyParser.urlencoded( {extended: true} ))


  app.get('/', index)
  app.get('/sign-up', signUp)
  app.get('/log-in', logIn)

  app.listen(3000, console.log("Listening on port " + 3000))


  function index(req, res) {
    res.render('index.ejs');
  }

  function signUp(req, res) {
    res.render('sign-up.ejs');
  }

  function logIn(req, res) {
    res.render('log-in.ejs');
  }

  app.use(function (req, res, next) {
    res.render('404.ejs')
  })
