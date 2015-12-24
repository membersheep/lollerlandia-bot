function Bot(chanService, telegramService) {
  this.chanService = chanService;
  this.telegramService = telegramService;
}

Bot.prototype.setup = function(token, telegramCallbackUrl, callback) {
  this.telegramService.setupWebhook(token, telegramCallbackUrl, function(err){
    if(err) {
      return callback(err);
    }
    return callback(null);
  });
};

Bot.prototype.readMessage = function(message) {
  this.commandMatcher(message);
  console.log(message.text);
  // Eventually do other stuff other than executing a command
};

Bot.prototype.commandMatcher = function(message) {
  if (message.text == '/b') {
    this.postRandomImageFromBoard(message.text, message.chat.id);
  }
};

Bot.prototype.postRandomImageFromBoard = function(board, chatId) {
  chanService.getRandomImage(board, function(err, localPath){
    telegramService.postImage(localPath, chatId);
  });
};

function create(chanService, telegramService) {
  if (chanService === undefined || telegramService === undefined) {
    throw new Error("Dependencies should be injected.");
  }
  return new Bot(chanService, telegramService);
}

module.exports.create = create;
