function TelegramRoute(telegramBot){
  this.bot = telegramBot;
}

TelegramRoute.prototype.fn = function(req, res) {
  console.log(req.body);
  var result = req.body;
  for (var update in result) {
    if (result.hasOwnProperty(update)) {
      console.log(this.bot);
      this.bot.readMessage(update.message);
    }
  }
};

function create (bot){
  if (bot === undefined) {
    throw new Error("Dependencies should be injected.");
  }
  return new TelegramRoute(bot);
}

module.exports.create = create;
