var express = require('express');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var port = 8000;

express()
  //'give' access to the static folder
  .use('/static', express.static('static'))
  .use(bodyParser.urlencoded({ extended: false}))
  .use(bodyParser.json())

  .set('view engine', 'ejs')
  .set('views', 'views')

  //Make routes to different pages.  Method(path, handler) (Don't forget to actualy create the handler)
  .get('/', index)
  .get('/sign-up', signUp)
  .get('/profile', profile)
  .get('/interest', interest)

  //This listens to the var port. var port usually holds 8000 or 3000. (match localhost:'port' to the number stated at the top)
  .listen(port, console.log("Listening on port " + port))

//req = requst, res = response. This handles the index request from '.get('/', index)'
function index(req, res) {
  res.render('index.ejs')
}

function signUp(req, res) {
  res.render('sign-up.ejs')
}

function profile(req, res) {
  res.render('profile.ejs')
}

function interest(req, res) {
  res.render('interest.ejs')
}
