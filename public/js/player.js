var as;
var audio;

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
