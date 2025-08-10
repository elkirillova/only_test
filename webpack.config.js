import path from 'path'
import webpack from 'webpack'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

const isProduction = process.env.NODE_ENV === 'production'
const publicPath = isProduction ? '/only_test/' : '/'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('NODE_ENV:', process.env.NODE_ENV, 'envFile:', envFile)

const config = {
	entry: './src/main.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[contenthash].js',
		publicPath,
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						compilerOptions: {
							noEmit: false,
						},
					},
				},
			},
			{
				test: /\.(scss|css)$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: {
								filter: (url, resourcePath) => {
									// Не обрабатывать абсолютные пути (начинающиеся с /),
									// которые ведут к public-папке
									if (url.startsWith('/')) {
										return false // оставляем путь как есть
									}
									return true // остальные пути обрабатываем по умолчанию
								},
							},
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext][query]',
					publicPath: `${publicPath}`,
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			//'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.PUBLIC_URL': JSON.stringify(publicPath),
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			publicPath: publicPath,
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: 'public',
		// 			to: '.',
		// 			globOptions: {
		// 				ignore: ['**/index.html'],
		// 			},
		// 		},
		// 	],
		// }),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
			publicPath: publicPath,
		},
		historyApiFallback: {
			index: publicPath,
		},
		compress: true,
		port: 3000,
		open: true,
		hot: true,
	},
}

console.log('publicPath:', publicPath)

export default config
