var BOT_TOKEN = "158621575:AAEUlrWtGVzdNlAO7FT238J507ogOZJvfKc";
var SERVER_PORT = "443";

var express = require('express');
var bodyParser = require('body-parser');

var StatusRoute = require('./routes/status');
var statusRoute = StatusRoute.create();

var TelegramRoute = require('./routes/telegramRoute');
var TelegramAPI = require('./modules/TelegramAPI');
var ChanAPI = require('./modules/4ChanService/4ChanAPI');
var ChanService = require('./modules/4ChanService/4ChanService');
var chanService = ChanService.create(ChanAPI);
var Bot = require('./modules/Bot');
var bot = Bot.create(chanService, TelegramAPI);
bot.setup(BOT_TOKEN, 'https://lollerlandia-bot.herokuapp.com/telegramBot', function(err) {
  if (err) {
    return console.log(err);
  }
  return console.log('Bot successfully set up.');
});
var telegramRoute = TelegramRoute.create(bot);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/status', statusRoute.fn);
app.get('/telegramBot', telegramRoute.fn);

var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Bot server listening at http://%s:%s', host, port);
});
