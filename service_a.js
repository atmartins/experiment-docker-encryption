const http = require('http')

var options = {
  host: 'service_b',
  port: 80,
  path: '/',
  method: 'GET'
};

http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    // log response from service_b, to prove we were able to talk to it.
    console.log('BODY: ' + chunk);
  });
}).end();
