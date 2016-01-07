var config = require('../config');
var request = require('request');
var fs = require('fs');

var telegramAPI = {};

telegramAPI.setupWebhook = function(token, url, callback){
  var requestUrl = config.TELEGRAM_BASE_URL + token + config.TELEGRAM_SETUP_WEBHOOK.replace(":url", url);
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
  fs.access(imagePath, fs.F_OK, function(err) {
    if (err) {
      callback(err);
    } else {
      var requestUrl = config.TELEGRAM_BASE_URL + token + config.TELEGRAM_POST_IMAGE;
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

telegramAPI.postDocument = function(token, documentPath, chatId, callback) {
  fs.access(documentPath, fs.F_OK, function(err) {
    if (err) {
      callback(err);
    } else {
      var requestUrl = config.TELEGRAM_BASE_URL + token + config.TELEGRAM_POST_DOCUMENT;
      var formData = {
        chat_id: chatId,
        document: fs.createReadStream(documentPath)
      };
      request.post({url:requestUrl, formData: formData}, function(err, res, body) {
        if (err) {
          return callback(err);
        } else if (res.statusCode == 200) {
          return callback(null, res, body);
        } else {
          return callback(new Error("Unable to post document. Code " + res.statusCode));
        }
      });
    }
  });
};

telegramAPI.answerInlineQueryWithImage = function(token, imagePath, queryId){
  // TODO: Implement this method.
};

module.exports = telegramAPI;
