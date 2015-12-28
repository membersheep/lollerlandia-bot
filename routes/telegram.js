var bot = require('../modules/Bot.js');

module.exports = function(req, res) {
  var result = req.body;
  bot.readMessage(result.message);
};
