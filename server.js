import express from 'express';
import Router from "react-router";
var app = express();
import webpack from 'webpack';
import bodyParser from 'body-parser';
import compression from 'compression';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import request from 'request';
import FeedParser from 'feedparser';

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))
app.use(compression());
app.use(bodyParser.json({
    limit: '40mb'
}));
app.use(bodyParser.urlencoded({
    limit: '40mb',
    extended: false
}));
app.use(express.static('public'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", function(request, response) {
    response.sendFile(__dirname + '/client/index.html');
});

app.post("/api/getfeed", function(req, res) {
    const reqfeed = request(req.body.params.url);
    const feedparser = new FeedParser();
    let to_send = {
        "items": [],
        "from": req.body.params.url
    };

    reqfeed.on('error', error => {
        // handle any request errors 
    });

    reqfeed.on('response', function(res) {
        const stream = this; // `this` is `req`, which is a stream 
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
        const meta = this.meta;
        let item;
        ;
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
    console.log('Your app is listening on port ' + listener.address().port);
});
