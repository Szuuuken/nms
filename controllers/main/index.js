var auth = require('../../lib/auth/auth');

exports.view = function(req, res){
  auth.restrict(req,res,function(){
    res.send('Wahoo! restricted area');
  });
};
