var fourChanCommunicator = require('../modules/fourChanCommunicator');

describe('4chan communicator', function(){
  describe('random image download', function(){
    it('downloads a random image from /b/', function(){
      fourChanCommunicator.getRandomImage();
    });
  });
});
