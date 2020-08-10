const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
    entry: {
        'pages/index/index': ['babel-polyfill', './src/client/js/pages/index/index.js'],
        'pages/trip/trip': ['babel-polyfill', './src/client/js/pages/trip/trip.js'],
        'pages/location/location': ['babel-polyfill', './src/client/js/pages/location/location.js'],
        'pages/location-detail/location-detail': ['babel-polyfill', './src/client/js/pages/location-detail/location-detail.js'],
        'pages/location-calendar/location-calendar': ['babel-polyfill', './src/client/js/pages/location-calendar/location-calendar.js']
    },
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'src/server/dist'),
        filename: '[name].js',
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
            template: "./src/client/views/index.html",
            filename: "./pages/index/index.html",
            chunks: ['pages/index/index']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/trip.html",
            filename: "./pages/trip/trip.html",
            chunks: ['pages/trip/trip']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/location.html",
            filename: "./pages/location/location.html",
            chunks: ['pages/location/location']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/location-detail.html",
            filename: "./pages/location-detail/location-detail.html",
            chunks: ['pages/location-detail/location-detail']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/location-calendar.html",
            filename: "./pages/location-calendar/location-calendar.html",
            chunks: ['pages/location-calendar/location-calendar']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new WorkboxPlugin.GenerateSW()
    ]
};