exports.view = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  }); 
};
