const express = require('express')
const port = 3000
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/about', (req, res) => res.send('about'))

//This displays a msg in the terminal if executed with node index.js
app.listen(port, () => console.log(`index.js app listening on port ${port}!`))
