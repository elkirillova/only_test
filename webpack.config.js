import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = {
	entry: './src/main.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[contenthash].js',
		publicPath: '/only_test/',
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
					process.env.NODE_ENV === 'production'
						? MiniCssExtractPlugin.loader
						: 'style-loader',
					'css-loader',
					'sass-loader',
					// {
					// 	loader: 'sass-loader',
					// 	options: {
					// 		sassOptions: {
					// 			includePaths: [path.resolve(__dirname, 'src')],
					// 		},
					// 	},
					// },
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext][query]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		historyApiFallback: true,
		compress: true,
		port: 3000,
		open: true,
		hot: true,
	},
}

export default config
