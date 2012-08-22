exports.view = function(req,res){
  res.render('singup');
};

exports.create = function(req,res){
  auth.singUpUser(req.body.username, req.body.password);
  res.redirect('login');
};
