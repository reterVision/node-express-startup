
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , sys = require('sys');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log('Use CTRL-C to stop server')
});

// Export interface for testing
function node_server(port) {
	this.server = http.createServer(app).listen(port);
	this.port = port;
}

node_server.prototype.mainpage = function(callback) {
	http.get({host:'localhost', port:this.port, path:'/', agent:false}, function(res){
		callback(res.statusCode);
	});
}	

node_server.prototype.close_server = function() {
	this.server.close();
}

exports.node_server = node_server;

