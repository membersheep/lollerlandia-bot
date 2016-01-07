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

telegramAPI.answerQueryWithMedia = function(token, queryId, mediaURLs, callback) {
  var requestUrl = config.TELEGRAM_BASE_URL + token + config.TELEGRAM_ANSWER_QUERY;
  var results = mediaURLs.map(function(url) {
    var fileExtension = url.split('.').pop();
    var fileName = url.split('/').pop().split('.').pop();
    var thumbnailUrl = url.replace('.' + fileExtension, 's.jpg');
    var result = {};
    switch (fileExtension) {
      case 'png':
        result.type = 'photo';
        result.id = fileName;
        result.photo_url = thumbnailUrl;
        result.thumb_url = thumbnailUrl;
        break;
      case 'jpg':
        result.type = 'photo';
        result.id = fileName;
        result.photo_url = url;
        result.thumb_url = thumbnailUrl;
        break;
      case 'gif':
        result.type = 'gif';
        result.id = fileName;
        result.gif_url = url;
        result.thumb_url = thumbnailUrl;
        break;
      case 'webm':
        result.type = 'video';
        result.id = fileName;
        result.video_url = url;
        result.thumb_url = thumbnailUrl;
        result.mime_type = 'video/mp4';
        result.message_text = '';
        result.title = fileName;
        break;
      default:
        result.type = 'photo';
        result.id = fileName;
        result.photo_url = thumbnailUrl;
        result.thumb_url = thumbnailUrl;
    }
    return result;
  });
  request.post(requestUrl, {inline_query_id:queryId, results: results}, function(err, res, body) {
    if (err) {
      return callback(err);
    } else if (res.statusCode == 200) {
      return callback(null, res, body);
    } else {
      return callback(new Error("ERROR: Unable to answer query. Code " + res.statusCode));
    }
  });
};

module.exports = telegramAPI;
