var chanService = require('./4ChanService');
var telegramService = require('./TelegramAPI');
var token = "158621575:AAEUlrWtGVzdNlAO7FT238J507ogOZJvfKc";

var bot = {
    readMessage: function(message) {
      if (message.text == '/b') {
        chanService.getRandomImage(message.text, function(err, localPath){
          if (err) {
            return console.log(err);
          } else {
            telegramService.postImage(token, localPath, message.chat.id);
          }
        });
      }
    }
  };

module.exports = bot;
