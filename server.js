import express from 'express';
var app = express();
import webpack from 'webpack';
import bodyParser from 'body-parser';
import compression from 'compression';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devConf from './webpack.config';
import prodConf from './webpack.config.prod';
import request from 'request';
import FeedParser from 'feedparser';

var config = process.env.NODE_ENV == 'production' ? prodConf : devConf;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(compression());
app.use(bodyParser.json({
	limit: '40mb'
}));
app.use(bodyParser.urlencoded({
	limit: '40mb',
	extended: false
}));
app.use(express.static('public'));

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/client/index.html');
});

app.post('/api/getfeed', function(req, res) {
	const reqfeed = request(req.body.params.url);
	const feedparser = new FeedParser();
	let to_send = {
		'items': [],
		'from': req.body.params.url
	};

	reqfeed.on('error', error => {
		console.log(error);
	});

	reqfeed.on('response', function(res) {
		const stream = this;
		if (res.statusCode !== 200) {
			this.emit('error', new Error('Bad status code'));
		} else {
			stream.pipe(feedparser);
		}
	});

	feedparser.on('error', error => {
		console.log(error);
	});

	feedparser.on('readable', function() {

		const stream = this;
        
		const streamdata = stream.read();
		if (streamdata) {
			to_send.items.push(streamdata);
		}
	});

	feedparser.on('finish', function() {
		res.send(to_send);
	});

});


var listener = app.listen(process.env.PORT || 4025, function() {
	console.log('Your app('+process.env.NODE_ENV+') is listening on port ' + listener.address().port);
});
