const { merge } = require('webpack-merge')
const commom = require('./webpack.commom.js')

module.exports = merge(commom, {
	mode: 'production',
	devtool: 'source-map',
});
