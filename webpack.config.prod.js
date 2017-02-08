var path = require('path');
var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
	devtool: 'hidden-source-map',
	entry: [
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
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		}),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
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