var path = require('path');
var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');


module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'babel-polyfill',
		'./index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				loader: 'style-loader!css-loader?name=public/[hash].[ext]'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file?name=public/fonts/[name].[ext]'
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				loaders: ['react-hot', 'babel-loader'],
				include: [
					path.resolve(__dirname),
				],
				exclude: /node_modules/,
				test: /\.js$/,
				plugins: ['transform-runtime'],
			},
		]
	},
	postcss: () => [
		postcssFocus(),
		cssnext({
			browsers: ['last 2 versions', 'IE > 10'],
		}),
		postcssReporter({
			clearMessages: true,
		}),
	],
};