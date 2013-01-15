var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');
var fs = require('fs');

exports.show = function(req, res){
  auth.restrict(req,res,function(){
	var trackId = req.route.params.track_id;
	music.getTrackByHash(trackId,function(track){
 		var filename = track.path;
 		
		var response = res;
		var fileSystem = fs;
		var filePath = track.path;

		res.sendfile(track.path);
	});
  });
};
