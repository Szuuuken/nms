var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');

exports.view = function(req, res){
  auth.restrict(req,res,function(){

    var entry1 = {text : 'home',link:'/home'};
    var entry2 = {text : 'logout',link:'/logout'};
    var entries = [entry1];
    var entriesRight = [entry2]

    var navbar = {title : 'nms',entries: entries,entriesRight:entriesRight};

    var genres = music.getGenres();
    var artists = music.getArtists();
    var albums = music.getAlbums();
    var tracks = music.getTracks();
    var render = {render : {navbar:navbar,genres:genres,artists:artists,albums:albums,tracks:tracks,showNavBar:true}};

    res.render('main',render);
  });
};
