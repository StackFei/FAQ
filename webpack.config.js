const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: './src/index.js',
	resolve: {
		extensions: ['.js', '.jsx', 'json']
	},
	optimization: {
		minimizer: {

		}
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
}