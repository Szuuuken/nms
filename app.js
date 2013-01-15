var express = require('express')
  , http = require('http')
  , path = require('path')
  , auth = require('./lib/auth/auth')
  , music = require('./lib/music/music')
  , cons = require('consolidate')
  , swig = require("swig")
  , RedisStore = require('connect-redis')(express);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 1337);
  app.engine('html', cons.swig);
  app.set('view engine', 'html');
  swig.init({ root: __dirname + '/views', allowErrors: true });
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));

  //app.use(express.session({store: new RedisStore({host: cfg.redis.host,db: cfg.redis.db,ttl: 30}), secret: 'foobar'}));
  //app.use(express.session({ store: new RedisStore({host:'127.0.0.1', port:6380, prefix:'chs-sess'}), secret: 'lolcat' }));
  //app.use(express.session({ store: new RedisStore, secret: 'lolcat'}));
  //app.use(express.session({store: new RedisStore, secret: 'lolcat',cookie: { maxAge: 60 * 60 * 1000 }}));
  //app.use(express.session({secret: 'lalala',store: new RedisStore,cookie: {maxAge:86400000 },key:'sid'}));
  app.use(express.session({ store: new RedisStore }));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./lib/boot/boot')(app, { verbose: !module.parent });

music.scanDirectory('/var/music');

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
