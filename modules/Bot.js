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

function create(chanService, telegramService) {
  if (chanService === undefined || telegramService === undefined) {
    throw new Error("Dependencies should be injected.");
  }
  return new Bot(chanService, telegramService);
}

module.exports.create = create;
