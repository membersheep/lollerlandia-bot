var message = '';

exports.readMessage =  function(msg) {
  message = msg;
};
exports.messages = function() {
  return message;
};
