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
	music.getTrackByHash(trackId,function(track){
		console.log(track.path);
 		var filename = track.path;
 		
		var response = res;
		var fileSystem = fs;
		var filePath = track.path;

		res.sendfile(track.path);
	});
  });
};
