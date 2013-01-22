var as;
var audio;

var genres;
var artists;
var ablums;
var tracks;

var genreFilter = -1;
var artistFilter = -1;
var albumFilter = -1;

function init(){
	resize();
	initEvents();
	loadInformations();
}

function setGenreFilter(filter){
	genreFilter = filter;
	setArtistFilter(-1);
}

function setArtistFilter(filter){
	artistFilter = filter;
	setAlbumFilter(-1);
}

function setAlbumFilter(filter){
	albumFilter = filter;
}

function filter(){
	var filteredArtists = artists.filter(function(index){
		if(genreFilter == -1) return index;
		if($.inArray(genreFilter,index.genres) > -1){
			return index;
		}
	});
	
	var filteredAlbums = albums.filter(function(index){
		var filterGenre = ($.inArray(genreFilter,index.genres) > -1) || (genreFilter == -1);
		var filterArtist = (artistFilter == index.artistId) || (artistFilter == -1);
		if( filterGenre && filterArtist){
			return index;
		}
	});

	var filteredTracks = tracks.filter(function(index){
		var filterGenre = (genreFilter == index.genre.id) || (genreFilter == -1);
		var filterArtist = (artistFilter == index.artist.id) || (artistFilter == -1);
		var filterAlbum = (albumFilter == index.album.id) || (albumFilter == -1);
		if( filterGenre && filterArtist && filterAlbum){
			return index;
		}
	});

	return {artists:filteredArtists,albums:filteredAlbums,tracks:filteredTracks};
}

function rebuiltUIFilterBox(filteredItems, filterBoxId){
	var filterBox = $(filterBoxId);
	filterBox.children().remove();

	filterBox.append(new Option("All", -1));
	$.each(filteredItems, function(index, value) {
		filterBox.append(new Option(value.name, value.id));
	});
}

function rebuiltUIFilterBoxesByGenre(){
	var filteredItems = filter();
	rebuiltUIFilterBox(filteredItems.artists,"#artists");
	rebuiltUIFilterBox(filteredItems.albums,"#albums");
}

function rebuiltUIFilterBoxesByArtist(){
	var filteredItems = filter();
	rebuiltUIFilterBox(filteredItems.albums,"#albums");
}

function filterTrackTable(){
	var trackTable = $('#songs');
	var filteredItems = filter();

	trackTable.children().find( 'tr:not(:first)' ).remove();
	$.each(filteredItems.tracks,function(index,value){
		trackTable.append("<tr><td>"+value.name+"</td><td>"+value.artist.name+"</td><td>"+getAddButton(value)+"</td></tr>");	
	});
}

function getAddButton(track){
	return "<button id=\""+track.sha1+"\" onClick=\"addTrackToPlayer(this,'"+track.name+" - "+track.artist.name+"')\">Add</button>";
}
function initEvents(){
	$('#genres').change(function(){
		var genreId = parseInt($(this).val());
		setGenreFilter(genreId);
		rebuiltUIFilterBoxesByGenre();
		filterTrackTable();
	});

	$('#artists').change(function(){
		var artistId = parseInt($(this).val());
		setArtistFilter(artistId);
		rebuiltUIFilterBoxesByArtist();		
		filterTrackTable();
	}); 

	$('#albums').change(function(){
		var albumId = parseInt($(this).val());
		setAlbummFilter(albumId);
		filterTrackTable();
	}); 
}

function loadInformations(){
	loadGenres();
	loadArtists();
	loadAlbums();
	loadTracks();
}

function loadGenres(){
	var GenreLoader = $.getJSON("/genres", function (data){
		genres = data.genres;
	});
}

function loadArtists(){
	var ArtistsLoader = $.getJSON("/artists", function (data){
		artists = data.artists;
	});
}

function loadAlbums(){
	var AlbumsLoader = $.getJSON("/albums", function (data){
		albums = data.albums;
	});
}

function loadTracks(){
	var TracksLoader = $.getJSON("/tracks", function (data){
		tracks = data.tracks;
	});
}

function resize(){
	var resizeDiv = $( "#resizable" );
	resizeDiv.resizable();
	var width = 985;
	resizeDiv.resizable( "option", "maxWidth" ,width);
	resizeDiv.resizable( "option", "minWidth",width);
	
	resizeDiv.on("resize",function(e,ui){
		var genres = $("#genres");
		var artists = $("#artists");
		var albums = $("#albums");

		var divWidth = $(this).width();
		var divHeight= $(this).height() - 35;
		
		genres.height(divHeight);
		artists.height(divHeight);
		albums.height(divHeight);
	});
}


function addTrackToPlayer(button,desc){
	var player = $("#tracklist");
	player.append("<li><a href='#' data-src=\"track/" + button.id + "\" type=\"audio/mpeg\">"+desc+"</a></li>");
	$('ol li').click(function(e){
		e.preventDefault();
		$(this).addClass('playing').siblings().removeClass('playing');
		audio.load($('a',this).attr('data-src'));
		audio.play();
	});
	//console.log(player);
}

audiojs.events.ready(function() {
	as = audiojs.createAll({
          trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
          }
        });
	audio = as[0];
  });
