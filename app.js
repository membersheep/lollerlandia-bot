// LIBS
var express = require('express');
var bodyParser = require('body-parser');

// ROUTES
var statusRoute = require('./routes/status');

var TelegramRoute = require('./routes/telegramRoute');
var Bot = require('./modules/Bot');
var BOT_TOKEN = "158621575:AAEUlrWtGVzdNlAO7FT238J507ogOZJvfKc";
// TODO: load other dependencies (telegram bot and its dependencies, the two services)


// SETUP
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/status', statusRoute['/status'].fn);
app.get("/" + BOT_TOKEN, telegramBotRoute.listener.fn);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Bot server listening at http://%s:%s', host, port);
});
