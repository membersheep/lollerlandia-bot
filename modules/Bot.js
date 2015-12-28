var chanService = require('./4ChanService');
var telegramService = require('./TelegramAPI');

telegramService.setupWebhook('158621575:AAEUlrWtGVzdNlAO7FT238J507ogOZJvfKc', 'https://aqueous-lowlands-1093.herokuapp.com/telegramBot', function(err) {
  if (err) {
    return console.log(err);
  }
  return console.log('Bot successfully set up.');
});

var bot = {
    readMessage: function(message) {
      if (message.text == '/b') {
        chanService.getRandomImage(message.text, function(err, localPath){
          telegramService.postImage(localPath, chatId);
        });
      }
    }
  };




module.exports = bot;
