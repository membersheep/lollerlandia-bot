var bot = require('../modules/Bot.js');

module.exports = function(req, res) {
  var result = req.body;
  console.log(result);
  bot.readMessage(result.message);
};
