var proxyquire = require('proxyquire');

var botStub = require('./stubs/bot-stub');
var telegramMessageRequest = {
  body: {
    update_id:31836785,
    message:'message'
  }
};
var telegramQueryRequest = {
  body: {
    update_id:31836785,
    inline_query:'query'
  }
};
var malformedRequest = {
  bode: {
    update_id:31836785,
    inline_query:'malformed'
  }
};
var telegramResponse = {
  send: function(){}
};
var telegramHandler = proxyquire('../routes/telegram', { '../modules/Bot.js': botStub });

describe('Route: /telegram', function(){
  it('Reads a message from a message request', function(){
    botStub.reset();
    telegramHandler(telegramMessageRequest, telegramResponse);
    expect(botStub.message).toEqual(telegramMessageRequest.body.message);
  });
  it('Reads a query from a query request', function(){
    botStub.reset();
    telegramHandler(telegramQueryRequest, telegramResponse);
    expect(botStub.query).toEqual(telegramQueryRequest.body.inline_query);
  });
  it('Doesnt read a malformed request', function(){
    botStub.reset();
    telegramHandler(malformedRequest, telegramResponse);
    expect(botStub.message).toEqual('');
    expect(botStub.query).toEqual('');
  });
});
