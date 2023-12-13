const { merge } = require('webpack-merge')
const commom = require('./webpack.commom')

module.exports = merge(commom, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './src'
	},
});
