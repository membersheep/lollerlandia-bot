var Bot = require('../modules/Bot');

var fakeChan = {};
var fakeTelegram = {
  setupWebhook: function(token, url, callback) {
    callback(null);
  }
};

describe('Bot', function(){
  describe('#create', function(){
    it('creates a new bot', function(){
      var bot = Bot.create(fakeChan, fakeTelegram);

      expect(bot).not.toBe(null);
    });
  });
  describe('#setup', function(){
    it('sets up a new connection to telegram', function(){
      var success = false;
      var callback = function(){
        success = true;
      };

      var bot = Bot.create(fakeChan, fakeTelegram);
      bot.setup('token', 'https://localhost:3000/callbackUrl', callback);

      expect(success).toBe(true);
    });
  });

});
