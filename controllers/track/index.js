var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');
var fs = require('fs');
//var path = require('path');
//var mime = require('mime');
//var sys = require('sys');
var filed = require('filed');
//var oppressor = require('oppressor');
var util = require('util');

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
 		
		var response = res;
		var fileSystem = fs;
		var filePath = track.path;//path.join(__dirname, 'AstronomyCast Ep. 216 - Archaeoastronomy.mp3');

		/*var stat = fileSystem.statSync(filePath);
    
    		response.writeHead(200, {
        		'Content-Type': 'audio/mpeg', 
        		'Content-Length': stat.size
    		});
    
    		var readStream = fileSystem.createReadStream(filePath);
    		readStream.on('data', function(data) {
       	 		var flushed = response.write(data);
        		// Pause the read stream when the write stream gets saturated
        		if(!flushed)
            			readStream.pause();
    		});
    
    		response.on('drain', function() {
        		// Resume the read stream when the write stream gets hungry 
        		readStream.resume();    
    		});
    
    		readStream.on('end', function() {
        		response.end();        
    		});*/

/*		var stat = fileSystem.statSync(filePath);
    
    response.writeHead(200, {
        'Content-Type': 'audio/mpeg', 
        'Content-Length': stat.size
    });
    
    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to util.pump()
    util.pump(readStream, response);
*/

		//filed(filename).pipe(oppressor(req)).pipe(res);
		//req.pipe(filed(filename)).pipe(res);

		res.sendfile(track.path);
	});
  });
};
