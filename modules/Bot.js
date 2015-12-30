var chanService = require('./4ChanService');
var telegramService = require('./TelegramAPI');

var bot = {
    readMessage: function(message) {
      if (message.text == '/b') {
        chanService.getRandomImage(message.text, function(err, localPath){
          if (err) {
            return console.log(err);
          } else {
            telegramService.postImage(localPath, message.chat.id);
          }
        });
      }
    }
  };

module.exports = bot;
