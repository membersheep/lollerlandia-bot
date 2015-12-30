var chanAPI = require('./4ChanAPI');

var chanService = {};

chanService.getRandomImage = function(board, callback) {
  chanAPI.downloadJSONForBoard(board, function(err, body){
    if (err) {
      return callback(err);
    } else {
      var randomImageName = extractRandomImageName(body);
      chanAPI.downloadMedia(randomImageName, board, __dirname + "../images", function(err, path){
  			console.log(randomImageName + 'downloaded at' + path);
  			return callback(null, path);
  		});
    }
	});
};

function extractRandomImageName(body) {
  var imageFileName = body.threads[0].posts[0].tim;
  var imageFileExtension = body.threads[0].posts[0].ext;

  return imageFileName + "." + imageFileExtension;
}

module.exports = chanService;
