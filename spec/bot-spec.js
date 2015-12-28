var proxyquire = require('proxyquire');
var chanStub = require('./stubs/4chan-stub');
var telegramStub = require('./stubs/telegram-stub');

var bot = proxyquire('../modules/Bot', {
  './4ChanService': chanStub,
  './TelegramAPI': telegramStub
});

var telegramMessage = {
   message_id:30,
   from:{
      id:14174896,
      first_name:'Alessandro',
      last_name:'Maroso',
      username:'membersheep'
   },
   chat:{
      id:14174896,
      first_name:'Alessandro',
      last_name:'Maroso',
      username:'membersheep',
      type:'private'
   },
   date:1451317037,
   text:'/b'
};

describe('Bot: when it reads a message', function(){
  describe('that is a board name', function(){
    it('gets a random image and posts it to the same chat', function() {
      bot.readMessage(telegramMessage);
      expect(chanStub.called()).toBe(true);
      expect(telegramStub.chatId()).toEqual(telegramMessage.chat.id);
      expect(telegramStub.localPath()).toEqual(chanStub.path());
    });
  });
});
