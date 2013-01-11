function addTrackToPlayer(button){
	var player = $("#mainPlayer");
	player.append("<source src=\"track/" + button.id + "\" type=\"audio/mpeg\">");
	console.log(player);
}
