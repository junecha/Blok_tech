const express = require('express')
const port = 3000
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/about', (req, res) => res.send('about'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
