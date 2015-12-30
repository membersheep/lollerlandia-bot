var request = require('request');
var fs = require('fs');

// https://api.telegram.org/bot<token>/METHOD_NAME
var TELEGRAM_BASE_URL = "https://api.telegram.org/bot";
var SETUP_WEBHOOK = "/setWebhook?url=:url";
var POST_IMAGE = "/sendPhoto";

var telegramAPI = {};

telegramAPI.setupWebhook = function(token, url, callback){
  var requestUrl = TELEGRAM_BASE_URL + token + SETUP_WEBHOOK.replace(":url", url);
  request(requestUrl, {}, function (err, res, body) {
    if (err) {
      return callback(err);
    } else if (res.statusCode == 200) {
      return callback(null);
    } else {
      return callback(new Error("Unable to setup webhook. Code " + res.statusCode));
    }
  });
};

telegramAPI.postImage = function(token, imagePath, chatId, callback) {
  console.log(imagePath);
  fs.access(imagePath, fs.F_OK, function(err) {
    if (err) {
      callback(err);
    } else {
      var requestUrl = TELEGRAM_BASE_URL + token + POST_IMAGE;
      var formData = {
        chat_id: chatId,
        photo: fs.createReadStream(imagePath)
      };
      request.post({url:requestUrl, formData: formData}, function(err, res, body) {
        if (err) {
          return callback(err);
        } else if (res.statusCode == 200) {
          return callback(null, res, body);
        } else {
          return callback(new Error("Unable to post image. Code " + res.statusCode));
        }
      });
    }
  });
};

module.exports = telegramAPI;
