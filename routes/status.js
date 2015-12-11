var statusRoute = {
  '/status': {
    method: 'get',
    fn: function(req, res) {
      res.json({ status: 'UP' });
    }
  }
};

module.exports = statusRoute;
