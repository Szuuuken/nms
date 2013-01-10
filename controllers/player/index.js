var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');

exports.show = function(req, res){
  auth.restrict(req,res,function(){
	var trackId = req.route.params.player_id;
	
	music.getTrackByHash(trackId,function(track){
		var url = "../track/"+track.sha1;
		track.url = url;
		track = {track : track};
		console.log(track);
		res.render("player",track);
	});
  });
};
