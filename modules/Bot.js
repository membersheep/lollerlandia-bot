var chanService = require('./4ChanService');
var telegramService = require('./TelegramAPI');

function bot() {
  return  {
    readMessage: function(message) {
      if (message.text == '/b') {
        chanService.getRandomImage(message.text, function(err, localPath){
          telegramService.postImage(localPath, chatId);
        });
      }
    }
  };
}

module.exports = bot();
