var config = require('../config');
var chanService = require('./4ChanService');
var telegramService = require('./TelegramAPI');

var bot = {
    readMessage: function(message) {
      if (message.text == '/b') {
        chanService.getRandomImage(message.text, function(err, localPath){
          if (err) {
            return console.log(err);
          } else {
            telegramService.postImage(config.TOKEN, localPath, message.chat.id, function(err, res, body) {
              if (err) {
                return console.log(err);
              } else {
                return console.log('image posted!');
              }
            });
          }
        });
      }
    }
  };

module.exports = bot;
