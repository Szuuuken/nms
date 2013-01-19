var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');

exports.view = function(req, res){
  auth.restrict(req,res,function(){
    res.json(music.getGenres());
  });
};
