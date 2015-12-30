var config = require('../config');
var chanService = require('./4ChanService');
var telegramService = require('./TelegramAPI');

var bot = {};

bot.readMessage = function(message) {
  console.log('reading message...');
  if (bot.isMessageNew(message)) {
    console.log('message is new');
    if (bot.isMessageCommand(message)) {
      console.log('message is command');
      bot.executeCommand(message);
    }
  } else {
    console.log('message is old, drop it.');
  }
  if (message.text == '/b') {

  }
};

bot.executeCommand = function(message) {
  if(config.BOARD_COMMANDS.indexOf(message.text) >= 0) {
    bot.executeBoardCommand(message);
  } else if(config.GENERIC_COMMANDS.indexOf(message.text) >= 0) {
    bot.executeGenericCommand(message);
  }
};

bot.executeBoardCommand = function (message) {
  chanService.getRandomImage(message.text, function(err, localPath){
    if (err) {
      return console.log(err);
    } else {
      var extension = localPath.split('.').pop();
      if (extension == 'png' || extension == 'jpg') {
        telegramService.postImage(config.TOKEN, localPath, message.chat.id, function(err, res, body) {
          if (err) {
            return console.log(err);
          } else {
            return console.log('image posted!');
          }
        });
      } else {
        telegramService.postDocument(config.TOKEN, localPath, message.chat.id, function(err, res, body) {
          if (err) {
            return console.log(err);
          } else {
            return console.log('document posted!');
          }
        });
      }
    }
  });
};

bot.executeGenericCommand = function (message) {
  return console.log('command ' + message.text);
};

bot.isMessageCommand = function(message) {
  if (!message.hasOwnProperty('text')) {
    return false;
  }
  return config.COMMANDS.indexOf(message.text) >= 0;
};

bot.isMessageNew = function(message) {
  if (!message.hasOwnProperty('date')) {
    return false;
  }
  if (!Number.isInteger(message.date)) {
    return false;
  }
  var currentDate = Date.now();
  var ONE_MINUTE = 60 * 60 * 1000;
  console.log(currentDate/1000);
  console.log(message.date);
  return (currentDate - message.date) < ONE_MINUTE;
};
console.log(Date.now());
module.exports = bot;
