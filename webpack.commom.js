const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			//favicon: './src/images/favicon.png',
		}),
		//new MiniCssExtractPlugin({
		//	filename: isDevelopment ? '[name].css' : '[name].[hash].css',
		//	chunkFilename: isDevelopment ? '[id].css' : '[name].[hash].css',
		//})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
}; 
