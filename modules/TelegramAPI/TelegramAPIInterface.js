var request = require('request');

// https://api.telegram.org/bot<token>/METHOD_NAME
var TELEGRAM_BASE_URL = "https://api.telegram.org/bot";
var SETUP_WEBHOOK = "/setWebhook?url=:url";
var POST_IMAGE = "/sendPhoto";

var telegramAPI = {};

telegramAPI.setupWebhook = function(token, url, successCallback, errorCallback){
  var requestUrl = TELEGRAM_BASE_URL + token + SETUP_WEBHOOK.replace(":url", url);
  request(requestUrl, function (error, response, body) {
    if (error) {
      errorCallback(error);
    } else if (response.statusCode == 200) {
      successCallback();
    } else {
      errorCallback("Unable to setup webhook.");
    }
  });
};

telegramAPI.postImage = function(imageLocalPath, chatId){
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

module.export = telegramAPI;
