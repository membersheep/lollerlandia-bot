var request = require('request');
var fs = require('fs');

var firstPageUrl = "http://a.4cdn.org/b/1.json";
var imageBaseUrl = "http://i.4cdn.org/b/";
var chanCommunicator = {};

var requestOptions = {
	json: true,
	headers: {
		'if-modified-since': (new Date()).toUTCString()
	}
};

chanCommunicator.getRandomImage = function(callback) {
  request(firstPageUrl, requestOptions, function(error, response, body){
		if (err)
      return callback(err);
    var imageUrl = extractRandomImageURL(body);
    downloadImageFromUrl(imageUrl);
	});
};

var extractRandomImageURL = function(body) {
  var imageFileName = body.threads[0].posts[0].tim;
  var imageFileExtension = body.threads[0].posts[0].ext;

  return imageBaseUrl + imageFileName + "." + imageFileExtension;
};

var downloadImageFromUrl = function(Url) {
  request(Url).pipe(fs.createWriteStream('images/doodle.png'));
};

module.export = chanCommunicator;
