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
	ensureExists(targetPath, 0744, function(err){
		if(err) {
			return callback(err);
		} else {
			request.head(requestUrl, function(err, res, body){
		    if(err) {
		      return callback(err);
		    } else {
		      var r = request(requestUrl).pipe(fs.createWriteStream(targetPath)).on('close', function(){
						callback(null, targetPath);
					});
		    }
		  });
		}
	});
};

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') {
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
					if (err.code == 'EEXIST') {
						cb(null);
					} else {
						cb(err);
					}
        } else {
					cb(null);
				}
    });
}

module.exports = chanInterface;
