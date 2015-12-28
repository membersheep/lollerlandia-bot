var messages = [];

var botStub = {
  readMessage: function(message) {
    messages.push(message);
  },
  messages: function() {
    return messages;
  }
};

module.exports = botStub;
