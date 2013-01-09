var tracklist = require("tracklist");
var tracks = new Array();
var artists = new Array();
var albums = new Array();

function scanDirectory(path){
	var tmpTracks = new Array();
	tracklist.list(path, function (err, result) {
		if (result) {

			artists.push({ artist : { id : "", name : result.artist}});

			console.log(result);
      			var trackString = (result.artist || "???") + " - " + (result.title || "???");
			tmpTracks.push(trackString);
			tracks = tmpTracks;
  		}
	});
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

function getTracks(){
	return tracks;
}

exports.getTracks = getTracks;
exports.scanDirectory = scanDirectory;
