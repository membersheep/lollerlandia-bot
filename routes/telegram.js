var bot = require('../modules/bot.js');

module.exports = function(req, res) {
  var result = req.body;
  for (var update in result) {
    if (result.hasOwnProperty(update)) {
      bot.readMessage(update.message);
    }
  }
  res.send();
};
