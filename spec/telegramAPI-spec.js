var proxyquire = require('proxyquire');

var requestStub = require('./stubs/request-stub');
var telegramAPI = proxyquire('../modules/telegramAPI', {'request': requestStub});

describe('Telegram API', function(){
  it('sets up webhook', function(){
    telegramAPI.setupWebhook('token', 'url', function(err){
      expect(err).toBe(null);
    });
  });
  it('sends a sendPhoto request to telegram', function(){
    telegramAPI.postImage('token', __dirname + '/data/test.gif', 1, function(err){
      expect(err).toBe(null);
    });
    // TODO: Add tests for request conformity
  });
});
