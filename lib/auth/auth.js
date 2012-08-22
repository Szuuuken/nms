var hash = require('./pass').hash;
var db = require('../db/db');

exports.authenticate = function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  db.getUser(name,function(err,rows,fields){
	if (err) throw err;
	var user = rows[0];
 	if (!user) return fn(new Error('cannot find user'));
  	hash(pass,"a",function(err,hash){
	var hexHash = new Buffer(hash,'binary').toString('hex')
    	if (err) return fn(err);
    	if (hexHash == user.password) return fn(null, user);
    	fn(new Error('invalid password'));
  	})
   });
}

exports.restrict = function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

exports.singUpUser = function singUpUser(username,password){
  hash(password,"a", function(err,hash){
  if (err) throw err;
  var hexHash = new Buffer(hash,'binary').toString('hex')
  db.insertUser(username,hexHash);
  });
};
