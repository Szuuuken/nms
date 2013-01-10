var readdirp = require('readdirp');
var mediainfo = require("mediainfo");
var async = require('async');
var tracks = new Array();
var artists = new Array();
var albums = new Array();

function scanDirectory(path){
	var tmpTracks = new Array();

	readdirp({ root: path, fileFilter: '*.mp3' }).on('data', function (entry) {
		var filePath = entry.fullPath;
	
		mediainfo(filePath, function(err, result) {
  			if (err) {
    				return console.log(err);
  			}else{

				result = result[0]; //TODO: das mit [0] ist ungut
				tmpTracks.push(createNewTrackObject(result));
				tracks = tmpTracks;
			}
		});
	});
}

function createNewTrackObject(mediaInfoObj){
	var track = {
			name : (mediaInfoObj.track_name || "???"),
			artist : (mediaInfoObj.performer || "???"),
			path : mediaInfoObj.complete_name,
			sha1 : require('crypto').createHash('sha1').update(mediaInfoObj.complete_name + "blb870123basd").digest('base64')
		    };
	return track;
}

function addAlbum(artistName,albumName){
	var artistId = getArtistId(artistName);
	var albumId = getAlbumId(albumName);
	if(albumId == albums.length)
		albums.push({album : { id : albumId, name : albumName }});
}

function getAlbumId (albumName){
	process.argv.forEach(function (album, index, albums) {
                if(artist.name == albumName)
                        return album.index;
                else
                        return album.length;
        });
}

function addArtist(artistName){
	var artistId = getArtistId(artistName);
	if(artistId == artists.length)
		artists.push({ artist : { id : artistId, name : result.artist}});
}

function getAtistId(artistName){
	process.argv.forEach(function (artist, index, artists) {
  		if(artist.name == artistName)
			return artist.index;
		else
			return artists.length;
	});
}

function getTrackByHash(hash,callback){
	async.forEachSeries(tracks, function(track,err){
		if(track.sha1 == hash){
			callback(track);
		}
	});
}

function getTracks(){
	return tracks;
}

exports.getTracks = getTracks;
exports.scanDirectory = scanDirectory;
exports.getTrackByHash = getTrackByHash;
