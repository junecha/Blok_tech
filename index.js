var express = require('express')
var app = express()
var port = 3000

// Use ejs


app.get('/', function(req, res){
  res.render("index.js")
})


//This displays a msg in the terminal if executed with 'node index.js'
app.listen(3000, function() {
  console.log('App is running on port ' + port + '!')
})
