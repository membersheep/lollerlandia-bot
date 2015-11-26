var express = require('express');
var app = express();

// TODO: create telegram.js to talk with telegram API
// TODO: create commands handlers to react to commands

// TODO: create 4chan.js to get images from 4chan

// status
app.get('/status', function (req, res) {
  res.send('UP!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
