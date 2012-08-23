var auth = require('../../lib/auth/auth');

exports.view = function(req, res){
  auth.restrict(req,res,function(){

    var entry1 = {text : 'home',link:'/home'};
    var entry2 = {text : 'logout',link:'/logout'};
    var entries = [entry1,entry2];
    var navbar = {title : 'nms',entries: entries};
    res.render('main',{navbar : navbar});
  });
};
