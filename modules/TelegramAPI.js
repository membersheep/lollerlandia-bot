var request = require('request');
var fs = require('fs');

// https://api.telegram.org/bot<token>/METHOD_NAME
var TELEGRAM_BASE_URL = "https://api.telegram.org/bot";
var SETUP_WEBHOOK = "/setWebhook?url=:url";
var POST_IMAGE = "/sendPhoto";

var telegramAPI = {};

telegramAPI.setupWebhook = function(token, url, callback){
  var requestUrl = TELEGRAM_BASE_URL + token + SETUP_WEBHOOK.replace(":url", url);
  request(requestUrl, function (err, res, body) {
    if (err) {
      return callback(err);
    } else if (res.statusCode == 200) {
      console.log(res.body);
      return callback(null);
    } else {
      return callback(new Error("Unable to setup webhook. Code " + res.statusCode));
    }
  });
};

telegramAPI.setupWebhook('158621575:AAEUlrWtGVzdNlAO7FT238J507ogOZJvfKc', 'https://aqueous-lowlands-1093.herokuapp.com/telegramBot', function(err) {
  if (err) {
    return console.log(err);
  }
  return console.log('Bot successfully set up.');
});

telegramAPI.postImage = function(token, imageLocalPath, chatId){
  var requestUrl = TELEGRAM_BASE_URL + token + POST_IMAGE;
  var formData = {
    chat_id: chatId,
    photo: fs.createReadStream(imageLocalPath)
  };
  request.post({url:requestUrl, formData: formData}, function(err, httpResponse, body) {
    if (err) {
      console.error('Photo upload failed:', err);
    } else {
      console.log('Photo upload successful!  Server responded with:', body);
    }
  });
};

module.exports = telegramAPI;
