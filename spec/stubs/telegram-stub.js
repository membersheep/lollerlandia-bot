var localPath = '';
var chatId = '';

exports.postImage =  function(imageLocalPath, cId) {
  localPath = imageLocalPath;
  chatId = cId;
};

exports.localPath = function() {
  return localPath;
};

exports.chatId = function() {
  return chatId;
};
