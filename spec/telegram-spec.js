var proxyquire = require('proxyquire');

var botStub = require('./stubs/bot-stub');
var telegramRequest = {
  body: {
    update_id:31836785,
    message:'pippo'
  }
};
var telegramResponse = {
  send: function(){}
};
var telegramHandler = proxyquire('../routes/telegram', { '../modules/Bot.js': botStub });

describe('Route: /telegram', function(){
  it('Extract every message from body and reads it with Bot', function(){
    telegramHandler(telegramRequest, telegramResponse);
    expect(botStub.messages()).toEqual('pippo');
  });
});
