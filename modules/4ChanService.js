var chanAPI = require('./4ChanAPI');

var chanService = {};

chanService.getRandomImage = function(board, callback) {
  chanAPI.downloadJSONForBoard(board, function(err, body){
    if (err) {
      return callback(err);
    } else {
      var randomImageName = extractRandomImageName(body);
      console.log(randomImageName);
      chanAPI.downloadMedia(randomImageName, board, __dirname + "/../images", function(err, path){
  			return callback(null, path);
  		});
    }
	});
};

function extractRandomImageName(body) {
  var imageFileName = body.threads[1].posts[0].tim;
  var imageFileExtension = body.threads[1].posts[0].ext;
  return imageFileName + imageFileExtension;
}

module.exports = chanService;
