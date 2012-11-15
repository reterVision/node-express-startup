var express = require('express')
var app = express(),
	consolidate = require('consolidate')

// Set logger
app.use(express.logger())

// Assign the swig engine to html files
app.engine('html', consolidate.swig)

// Set .html as the default extension
app.set('view engine', 'html')

// Set default directory to find .html files
app.set('views', __dirname + '/views');

// Set default directory to find static files such as js files, css files and images
app.use(express.static(__dirname + '/public', {redirect: false}));
app.use(express.bodyParser());

app.get('/', function(req, res){
	res.render('index', {
		"title" : "You can set title here!"
	})
})

app.listen(3000)
console.log('Listening on port 3000...')
console.log('Use CTRL-C to stop server')