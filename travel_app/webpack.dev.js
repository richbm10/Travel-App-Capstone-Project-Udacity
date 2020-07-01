const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: ['babel-polyfill', './src/client/app/pages/index/index.js']
    },
    mode: 'development',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        filename: './pages/[name]/[name].js',
    },
    devServer: {
        port: 8000
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
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/images/[name].[ext]'
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
            filename: "./pages/[name]/[name].css"
        }),
        new CleanWebpackPlugin({
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
};