const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

//404 response when all the other functions and routes are responding. Always put this at the bottom.
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
//This displays a msg in the terminal if executed with node index.js
app.listen(3000, function() {
  console.log('App is running on port ' + port + '!');
}
