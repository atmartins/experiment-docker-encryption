const express = require('express');
const request = require('request');
const app = express();

app.get('/', function (req, res) {
  request('http://service_b:8090', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.send("(v4) From service b: " + body);
  });
});

app.get('/alive', function (req, res) {
  res.send('Service A is alive! (v4)');
});

app.listen(8089, function () {
  console.log('service a on port 8089!')
});
