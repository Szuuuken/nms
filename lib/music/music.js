var tracklist = require("tracklist");
var tracks = new Array();

function scanDirectory(path){
	var tmpTracks = new Array();
	tracklist.list(path, function (err, result) {
		if (result) {
      			var trackString = (result.artist || "???") + " - " + (result.title || "???");
			tmpTracks.push(trackString);
			tracks = tmpTracks;
  		}
	});
}

function getTracks(){
	return tracks;
}

exports.getTracks = getTracks;
exports.scanDirectory = scanDirectory;
