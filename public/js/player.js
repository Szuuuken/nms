var as;
var audio;

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
