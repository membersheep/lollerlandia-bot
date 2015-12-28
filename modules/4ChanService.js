var chanAPI = require('./4ChanAPI');

var chanService = {};

chanService.getRandomImage = function(board, callback) {
  chanAPI.downloadJSONForBoard(board, function(err, body){
    if (err) {
      return callback(err);
    } else if (res.statusCode == 200) {
      var randomImageName = extractRandomImageNames(body);
      chanAPI.downloadMedia(randomImageName, __dirname, function(path){
  			console.log(randomImageName + 'downloaded at' + path);
  			return callback(null, path);
  		});
    } else {
      return callback(new Error('Unable to get image'));
    }
	});
};

function extractRandomImageName(body) {
  var imageFileName = body.threads[0].posts[0].tim;
  var imageFileExtension = body.threads[0].posts[0].ext;

  return imageFileName + "." + imageFileExtension;
}

module.exports = chanService;
