var express = require('express');
var port = 3000;

express()
  //'give' access to the static folder
  .use('/static', express.static('static'))

  .set('view engine', 'ejs')
  .set('views', 'views')

  //Make routes to different pages.  Method(path, handler) (Don't forget to actualy create the handler)
  .get('/', index)
  .get('/profile', profile)

  //This listens to the var port. var port usually holds 8000 or 3000. (match localhost:'port' to the number stated at the top)
  .listen(port)

//req = requst, res = response. This handles the index request from '.get('/', inder)'
function index(req, res) {
  res.render('index.ejs')
}

function profile(req, res) {
  res.render('profile.ejs')
}
