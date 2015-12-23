var chanAPI = require('./4ChanAPIInterface');

var chanSource = {};

chanSource.getRandomImage = function(board, successCallback, errorCallback) {
  chanAPI.downloadJSONForBoard(board, function(body){
		var randomImageName = extractRandomImageURL(body);
		chanAPI.downloadMedia(randomImageName, __dirname, function(path){
			console.log(randomImageName + 'downloaded at' + path);
			successCallback(path);
		}, errorCallback);
	}, errorCallback);
};

var extractRandomImageName = function(body) {
  var imageFileName = body.threads[0].posts[0].tim;
  var imageFileExtension = body.threads[0].posts[0].ext;

  return imageFileName + "." + imageFileExtension;
};

module.export = chanSource;
