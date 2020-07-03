const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
    entry: {
        'pages/index/index': ['babel-polyfill', './src/client/app/pages/index/index.js']
    },
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/',
                    publicPath: '../../assets/fonts/'
                }
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 200000, // Convert images < 200kb to base64 strings
                    name: '[hash]-[name].[ext]',
                    outputPath: 'assets/images/',
                    publicPath: '../../assets/images/'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/app/pages/index/index.html",
            filename: "./pages/index/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new WorkboxPlugin.GenerateSW()
    ]
};