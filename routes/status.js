function StatusRoute(){

}

StatusRoute.prototype.fn = function(req, res) {
  console.log(req.body);
  res.json({ status: 'UP' });
};

function create (){
  return new StatusRoute();
}

module.exports.create = create;
