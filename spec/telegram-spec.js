var proxyquire = require('proxyquire');

var botStub = require('./stubs/bot-stub');
var telegramRequest = {
  body: {
    update: {
      message: 'pippo'
    }
  }
};
var telegramHandler = proxyquire('../routes/telegram', { '../modules/bot.js': botStub });

describe('Route: /telegram', function(){
  it('Extract every message from body and reads it with Bot', function(){
    telegramHandler(telegramRequest, {});
    expect(botStub.messages()).toEqual(['pippo']);
  });
});
