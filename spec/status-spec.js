var statusRoutes = require('../routes/status');

describe('status routes', function(){
  describe('server status', function(){
    it('returns UP', function(){
      statusRoutes['/status'].fn({}, {
        json: function(data) {
          expect(data).toEqual({ status: 'UP' });
        }
      });
    });
  });
});
