var auth = require('../../lib/auth/auth');

exports.view =  function(req, res){
  if (req.session.user) {
    req.session.success = 'Authenticated as ' + req.session.user.name
      + ' click to <a href="/logout">logout</a>. '
      + ' You may now access <a href="/restricted">/restricted</a>.';
    res.redirect('/main');
  }
  res.render('login',{navbar : {title:'nms'}});
};


exports.create = function(req, res){
  auth.authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      req.session.regenerate(function(){
        req.session.user = user;
        if(req.body.rememberMe != "remember"){
                req.session.cookie.expires = false;
        }
        res.redirect('/main');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
};
