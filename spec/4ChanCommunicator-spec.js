var chanCommunicator = require('../modules/4ChanCommunicator/4ChanCommunicator');

describe('4chan communicator', function(){
  describe('random image download', function(){
    it('should return the path of an image', function(){
      var path = chanCommunicator.getRandomImage();
      expect(path).not.toBe(null);
    });
  });
});
