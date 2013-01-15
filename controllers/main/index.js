var auth = require('../../lib/auth/auth');
var music = require('../../lib/music/music');

exports.view = function(req, res){
  auth.restrict(req,res,function(){

    var entry1 = {text : 'home',link:'/home'};
    var entry2 = {text : 'logout',link:'/logout'};
    var entries = [entry1,entry2];

    var navbar = {title : 'nms',entries: entries};
    var tracks = music.getTracks();
    var render = {render : {navbar:navbar, tracks:tracks}};

    res.render('main',render);
  });
};
