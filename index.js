var express = require('express')
var app = express()
var port = 3000

app.use('/static', express.static('static'))
app.set('view engine', pug)

//This displays a msg in the terminal if executed with node index.js
app.listen(3000, function() {
  console.log('App is running on port ' + port + '!');
}
