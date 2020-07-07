const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'pages/index/index': ['babel-polyfill', './src/client/app/pages/index/index.js'],
        'pages/trip/trip': ['babel-polyfill', './src/client/app/pages/trip/trip.js'],
        'pages/location/location': ['babel-polyfill', './src/client/app/pages/location/location.js'],
        'pages/location-detail/location-detail': ['babel-polyfill', './src/client/app/pages/location-detail/location-detail.js'],
        'pages/location-calendar/location-calendar': ['babel-polyfill', './src/client/app/pages/location-calendar/location-calendar.js']
    },
    mode: 'development',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
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
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
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
            chunks: ['pages/index/index']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/app/pages/trip/trip.html",
            filename: "./pages/trip/trip.html",
            chunks: ['pages/trip/trip']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/app/pages/location/location.html",
            filename: "./pages/location/location.html",
            chunks: ['pages/location/location']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/app/pages/location-detail/location-detail.html",
            filename: "./pages/location-detail/location-detail.html",
            chunks: ['pages/location-detail/location-detail']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/app/pages/location-calendar/location-calendar.html",
            filename: "./pages/location-calendar/location-calendar.html",
            chunks: ['pages/location-calendar/location-calendar']
        }),
        new MiniCssExtractPlugin({
            filename: "./[name].css"
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