var express = require('express');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var port = 8000;

express()
  //'give' access to the static folder
  .use('/static', express.static('static'))

  .set('view engine', 'ejs')
  .set('views', 'views')

  //Make routes to different pages.  Method(path, handler) (Don't forget to actualy create the handler)
  .get('/', index)
  .get('/profile', profile)
  .get('/interest', interest)

  // .get('/form-with-get.ejs', form_with_get)
  // .get('/form-with-post', form_with_post)

  //This listens to the var port. var port usually holds 8000 or 3000. (match localhost:'port' to the number stated at the top)
  .listen(port)

//req = requst, res = response. This handles the index request from '.get('/', inder)'
function index(req, res) {
  res.render('index.ejs')
}

function profile(req, res) {
  res.render('profile.ejs')
}

function interest(req, res) {
  res.render('interest.ejs')
}

// function form_with_get(req, res) {
//   return response.render('form-with-get')
// }
//
// function form_with_post(req, res) {
//   return response.render('form-with-post')
// }
//
// function form_with_get(req, res) {
//   return response.send(req.query)
// }
