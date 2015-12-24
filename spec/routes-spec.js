var StatusRoute = require('../routes/status');
var TelegramRoute = require('../routes/telegramRoute');
var testTelegramRequestJSON = require('./data/telegramRequest.json');

describe('Routes', function(){
  describe('/status', function(){
    it('sets status:UP in the response object', function(){
      var statusRoute = StatusRoute.create();
      statusRoute.fn({}, {
        json: function(data) {
          expect(data).toEqual({ status: 'UP' });
        }
      });
    });
  });
  describe('/telegram', function(){
    var messages = [];
    var bot = {
      readMessage: function(message){
        messages.push(message);
      }
    };
    var telegramRoute = TelegramRoute.create(bot);

    it('forwards every message to the bot', function(){
      // var request = {body};
      // telegramRoute.fn(request, {});
    });
  });
});
