var request = require('request');
var fs = require('fs');

var baseUrl = "http://a.4cdn.org/";
var imageBaseUrl = "http://i.4cdn.org/";
var requestOptions = {
	json: true,
	headers: {
		'if-modified-since': (new Date()).toUTCString()
	}
};
var chanInterface = {};

chanInterface.downloadJSONForBoard = function(board, successCallback, errorCallback) {
  var requestUrl = baseUrl + board + "/1.json";
  request(requestUrl, requestOptions, function (error, response, body) {
    if (error) {
      errorCallback(error);
    } else if (response.statusCode == 200) {
      successCallback(body);
    }
  });
};

chanInterface.downloadMedia = function(name, localPath, successCallback, errorCallback) {
  var requestUrl = imageBaseUrl + board + "/" + name;
  var targetPath = localPath + "/" + filename;

  request.head(requestUrl, function(error, response, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    if(error) {
      errorCallback(error);
    } else {
      request(requestUrl).pipe(fs.createWriteStream(targetPath)).on('close', successCallback(targetPath));
    }
  });
};

module.export = chanInterface;
