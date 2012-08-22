var express = require('express')
  , http = require('http')
  , path = require('path')
  , auth = require('./lib/auth/auth')
  , cons = require('consolidate')
  , swig = require("swig");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 1337);
  app.engine('html', cons.swig);
  app.set('view engine', 'html');
  swig.init({ root: __dirname + '/views', allowErrors: true });
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('lalala'));
  app.use(express.session({cookie: { maxAge: 60 * 60 * 1000 }}));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./lib/boot/boot')(app, { verbose: !module.parent });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
