var as;
var audio;
var genres;
var artists;
var ablums;
var tracks;

function init(){
	resize();
	initEvents();
	loadInformations();
}

function initEvents(){
	$('#genres').change(function(){
		var genreId = parseInt($(this).val());
	
		var filterdArtists = artists.filter(function(index){
			if($.inArray(genreId,index.genres) > -1){
				return index;
			}
		});
		
		var filterdAlbums = albums.filter(function(index){
			if($.inArray(genreId,index.genres) > -1){
				return index;
			}
		});

		var filterdTracks = tracks.filter(function(index){
			if($.inArray(genreId,index.genres) > -1){
				return index;
			}
		});
	});

	$('#artists').change(function(){
		//console.log($(this).val());
		$(this).children().eq(this.selectedIndex).appendTo('#hidden');
	}); 

	$('#albums').change(function(){
		console.log($(this).val());
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
