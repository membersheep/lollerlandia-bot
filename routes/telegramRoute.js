function TelegramRoute(telegramBot){
  this.bot = telegramBot;
}

TelegramRoute.prototype.fn = function(req, res) {
  console.log(req);
  var jsonData = JSON.parse(req.body);
  var result = jsonData.result;
  for (var update in result) {
    if (result.hasOwnProperty(update)) {
      this.bot.readMessage(update.message);
    }
  }
};

function create (url, bot){
  if (bot === undefined) {
    throw new Error("Dependencies should be injected.");
  }
  return new TelegramRoute(bot);
}

module.exports.create = create;
