var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');
//var fs = require('fs');
//var path = require('path');
//var mime = require('mime');
//var sys = require('sys');
var filed = require('filed');
//var oppressor = require('oppressor');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

exports.show = function(req, res){
  auth.restrict(req,res,function(){
	var trackId = req.route.params.track_id;
	console.log(trackId);
	music.getTrackByHash(trackId,function(track){
		console.log(track.path);
 		var filename = track.path;
 		
		/*var readStream = fs.createReadStream(filename);

  		readStream.on('open', function () {
    			readStream.pipe(res);
  		});
	
		readStream.on('error', function(err) {
    			res.end(err);
  		});*/
	/*	
	sys.pump(fs.createReadStream(filename, {
  'bufferSize': 4 * 1024
}), res)*/


		//filed(filename).pipe(oppressor(req)).pipe(res);
		req.pipe(filed(filename)).pipe(res);

		//res.sendfile(track.path);
	});
  });
};
