const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash:8].${ext}`;

const optimization = () => {
	const config = {
	};

	if (!isDev) {
		config.minimizer = [
			new OptimizeCssAssetPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './js/script.js',
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			collapseWhitespace: !isDev,
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.less$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					'css-loader',
					'postcss-loader',
					'less-loader',
				]
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
			},
			{
				test: /\.(jpe?g|png|gif|ico|svg)/i,
				type: 'asset/resource',
				generator: { 
					filename: 'img/[name][ext]'
				},
			},
			{
				test: /\.(ttf|woff|woff2|otf)/i,
				type: 'asset/resource',
				generator: { 
					filename: 'fonts/[name][ext]'
				},
			},
		]
	},
	devServer: {
		open: isDev,
		hot: isDev,
	},
	optimization: optimization(),
	devtool: isDev ? 'source-map' : false
};