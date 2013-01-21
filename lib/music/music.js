var readdirp = require('readdirp');
var mediainfo = require('mediainfo');
var _ = require('underscore');

//var async = require('async');
var tracks = new Array();
var artists = new Array();
var albums = new Array();
var genres = new Array();

exports.getGenres = getGenres;
exports.getArtists = getArtists;
exports.getAlbums = getAlbums;
exports.getTracks = getTracks;
exports.scanDirectory = scanDirectory;
exports.getTrackByHash = getTrackByHash;

function scanDirectory(path){
	var tmpTracks = new Array();

	readdirp({ root: path, fileFilter: ['*.mp3','*.ogg'] }).on('data', function (entry) {
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

function getExt(path){
	if(path.match("\.(ogg)$"))
		return '.ogg';
	if(path.match("\.(mp3)$"))
		return '.mp3';
}

function createNewTrackObject(mediaInfoObj){
	
	var genreName = (mediaInfoObj.genre || "unknown");
	var albumName = (mediaInfoObj.album || "???");
	var artistName = (mediaInfoObj.performer || "???");

	var genreId = parseInt(addGenre(genreName));
	var artistId = parseInt(addArtist(artistName,genreId));
	var albumId = parseInt(addAlbum(albumName,artistId,genreId));
	
	var genre = { name : genreName, id : genreId };
	var artist = { name : artistName, id : artistId };
	var album = { name : albumName, id : albumId };

	var track = {
			name : (mediaInfoObj.track_name || "???"),
			artist : artist,
			path : mediaInfoObj.complete_name,
			sha1 : require('crypto').createHash('sha1').update(mediaInfoObj.complete_name + "blb870123basd").digest('hex') + getExt(mediaInfoObj.complete_name),
			genre: genre,
			album: album
		    };
		
	return track;
}

function addAlbum(albumName,artistId,genreId){
	var albumId = getAlbumId(albumName);

	if(albumId == albums.length){
		var albumGenreIds = new Array();
		albumGenreIds.push(genreId);
		albums.push({id : albumId, artistId: artistId, genres : albumGenreIds, name : albumName });
	}else{
		albums[albumId].genres.push(genreId);
	}

	return albumId;
}

function getAlbumId (albumName){
	var albumArray = getAlbums();
	if(albumArray.length == 0)
		return 0;
	for(var albumId in albumArray){
		var album = albumArray[albumId];
                if(album.name == albumName)
                        return albumId;
        }

	return albumArray.length;
}

function addArtist(artistName,genreId){
	var artistId = getArtistId(artistName);
	
	if(artistId == artists.length){
		var genreIds = new Array();
		genreIds.push(genreId);
		artists.push({ id : artistId, name : artistName, genres : genreIds });
	}else{
		var artist = artists[artistId];
		
		if(_.contains(artist.genres,genreId)){
			artist.genres.push(aristid);
		}
	} 
	
	return artistId;
}

function addGenre(genreName){
	var genreId = getGenreId(genreName);
	
	if(genreId == genres.length)
		genres.push({id : genreId, name : genreName });
	return genreId;
}

function getGenreId(genreName){
	var genresArray  = getGenres();
	if(genresArray.length == 0)
		return 0;

	for(var genreId in genresArray){
		var genre = genresArray[genreId];
  		if(genre.name == genreName)
			return genreId;
	}
	
	return genres.length;
}

function getArtistId(artistName,artists){
	var artistsArray = getArtists();
	if(artistsArray.length == 0)
		return 0;

	for(var artistId in artistsArray){
		var artist = artistsArray[artistId];
  		if(artist.name == artistName)
			return artistId;
	}
	
	return artistsArray.length;
}

function getTrackByHash(hash,callback){
	/*async.forEachSeries(tracks, function(track,err){
		if(track.sha1 == hash){
			callback(track);
		}
	});*/

	for (var track in tracks) {
		var t = tracks[track];
		if(t.sha1 == hash){
			callback(t);
		}
	}
}

function getTracks(){
	return (tracks || new Array());
}

function getGenres(){
	return (genres || new Array());
}

function getArtists(){
	return (artists || new Array());
}

function getAlbums(){
	return (albums || new Array());
}
