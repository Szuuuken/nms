var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');

exports.show = function(req, res){
  auth.restrict(req,res,function(){
	var trackId = req.route.params.track_id;
	
	music.getTrackByHash(trackId,function(track){
		console.log(track.path);
		res.sendfile(track.path);
	});
  });
};
