var path = require('path');
var webpack = require('webpack')


module.exports = {
	entry: './index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module:{
		loaders:[
			{ 
				test: /\.js|jsx$/, 
				loaders:['babel'],
				exclude:/node_modules/
			}
		]
	},
	plugins: [
	  new webpack.optimize.OccurrenceOrderPlugin(),
	  new webpack.HotModuleReplacementPlugin()
	]

}