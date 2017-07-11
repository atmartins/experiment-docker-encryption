const http = require('http');
const winston = require('winston');
winston.add(winston.transports.File, { filename: 'logs/logfile.log' });

var options = {
  host: 'service_b',
  port: 80,
  path: '/',
  method: 'GET'
};

setInterval(() => {
  http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      // log response from service_b, to prove we were able to talk to it.
      console.log('BODY: ' + chunk);
      winston.log('info', 'BODY: ' + chunk);
    });
  })
  .on('error', function(err) {
    console.log(err);
    winston.log('error', err);
  });
}, 2000);
