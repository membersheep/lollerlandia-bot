var request = require('request');
var fs = require('fs');

var CHAN_BASE_URL = "http://a.4cdn.org/";
var CHAN_IMAGE_BASE_URL = "http://i.4cdn.org/";
var CHAN_OPTIONS = {
	json: true,
	headers: {
		'if-modified-since': (new Date()).toUTCString()
	}
};

var chanInterface = {};

chanInterface.downloadJSONForBoard = function(board, callback) {
  var requestUrl = CHAN_BASE_URL + board + "/1.json";
  request(requestUrl, CHAN_OPTIONS, function (err, res, body) {
    if (err) {
      return callback(err);
    } else if (res.statusCode == 200) {
      return callback(null, body);
    } else {
      return callback(new Error("Unable to download JSON. Code " + res.statusCode));
    }
  });
};

chanInterface.downloadMedia = function(name, board, localPath, callback) {
  var requestUrl = CHAN_IMAGE_BASE_URL + board + "/" + name;
  var targetPath = localPath + "/" + name;

  request.head(requestUrl, function(err, res, body){
    if(err) {
      return callback(err);
    } else {
      var r = request(requestUrl).pipe(fs.createWriteStream(targetPath));
			r.on('close', callback);
    }
  });
};

chanInterface.downloadMedia('1405099255590.png', '/mu', __dirname + '/../images', function(err, body) {
	console.log('downloaded');
});

module.exports = chanInterface;
