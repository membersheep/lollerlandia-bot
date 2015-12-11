var express = require('express');

var statusRoute = require('routes/status');

var app = express();

app.get('/status', statusRoute['/status'].fn);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
