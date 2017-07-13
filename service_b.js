const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World from B! (v4)');
});

app.get('/alive', function (req, res) {
  res.send('Service B is alive! (v4)');
});

app.listen(8090, function () {
  console.log('service b on port 8090!')
})
