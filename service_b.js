const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World from B!')
})

app.listen(80, function () {
  console.log('service b on port 80!')
})
