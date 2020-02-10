const express = require('express');
const bodyParser = require('body-parser');

express()
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(bodyParser.json())
  .use('/static', express.static('static'))
  .use(bodyParser.urlencoded( {extended: true} ))

  .get('/', index)

  .listen(3000, console.log("Listening on port " + 3000))


  function index(req, res) {
    res.render('index.ejs');
  }
