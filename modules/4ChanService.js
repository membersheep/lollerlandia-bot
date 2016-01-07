var chanAPI = require('./4ChanAPI');
var config = require('../config');

var chanService = {};

chanService.getRandomImage = function(board, callback) {
  chanAPI.downloadJSONForBoard(board, function(err, body){
    if (err) {
      return callback(err);
    } else {
      var randomFileName = extractRandomFileName(body);
      if (randomFileName === undefined) {
        return callback(new Error("Impossible to extract a file name from JSON."));
      }
      chanAPI.downloadMedia(randomFileName, board, __dirname + "/../images", function(err, path){
        if (err) {
          return callback(err);
        } else {
          return callback(null, path);
        }
    	});
    }
	});
};

chanService.getRandomMediaURLsFromBoard = function(boardName, count, callback) {
  var board = '/' + boardName;
  chanAPI.downloadJSONForBoard(board, function(err, body){
    if (err) {
      return callback(err);
    } else {
      var randomFileNames = extractRandomFileNames(body, count);
      if (randomFileNames === undefined) {
        return callback(new Error("Impossible to extract a file name from JSON."));
      }
      var randomURLs = randomFileNames.map(function(filename){
        return config.CHAN_IMAGE_BASE_URL + filename;
      });
      return callback(null, randomURLs);
    }
	});
};

function extractRandomFileNames(body, count) {
  var filenames = [];
  for (var i = 0; i < count; i++) {
    var filename = extractRandomFileName(body);
    if (filename === undefined) {
      return undefined;
    }
    filenames.push(filename);
  }
  return filenames;
}

function extractRandomFileName(body) {
  if (!body.hasOwnProperty('threads')) {
    return undefined;
  }
  if (Object.prototype.toString.call(body.threads) !== '[object Array]') {
    return undefined;
  }

  var validThreads = body.threads.filter(isValidThread);

  if (validThreads.length === 0) {
    return undefined;
  }

  var randomThread = validThreads[Math.floor(Math.random() * validThreads.length)];
  var validPosts = randomThread.posts.filter(isValidPost);
  var randomPost = validPosts[Math.floor(Math.random()*validPosts.length)];
  var fileName = randomPost.tim;
  var fileExtension = randomPost.ext;
  return fileName + fileExtension;
}

function isValidThread(element, index, array) {
  if (element.hasOwnProperty('posts')) {
    if (Object.prototype.toString.call( element.posts ) === '[object Array]') {
      if (element.posts[0].hasOwnProperty('tim') && element.posts[0].hasOwnProperty('ext')) {
        return true;
      }
    }
  }
  return false;
}

function isValidPost(element, index, array) {
  return element.hasOwnProperty('tim') && element.hasOwnProperty('ext');
}

module.exports = chanService;
