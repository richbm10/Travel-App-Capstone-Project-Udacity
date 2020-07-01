const express = require('express');

const router = express.Router();

const locationRoute = require('./location');
const weatherRoute = require('./weather');
const imageRoute = require('./image');
const userRoute = require('./user');

module.exports = (param) => {

    router.get('/', function(req, res) {
        res.sendFile('dist/pages/index/index.html');
    });

    router.get('/index/main.js', function(req, res) {
        res.sendFile('dist/pages/index/main.js');
    });

    router.get('/index/main.css', function(req, res) {
        res.sendFile('dist/pages/index/main.css');
    });

    router.get('/trip', function(req, res) {
        res.sendFile('dist/pages/trip/trip.html');
    });

    router.get('/trip/main.js', function(req, res) {
        res.sendFile('dist/pages/trip/main.js');
    });

    router.get('/trip/main.css', function(req, res) {
        res.sendFile('dist/pages/trip/main.css');
    });

    router.get('/location', function(req, res) {
        res.sendFile('dist/pages/location/location.html');
    });

    router.get('/location/main.js', function(req, res) {
        res.sendFile('dist/pages/location/main.js');
    });

    router.get('/location/main.css', function(req, res) {
        res.sendFile('dist/pages/location/main.css');
    });

    router.get('/location-detail', function(req, res) {
        res.sendFile('dist/pages/location-detail/location-detail.html');
    });

    router.get('/location-detail/main.js', function(req, res) {
        res.sendFile('dist/pages/location-detail/main.js');
    });

    router.get('/location-detail/main.css', function(req, res) {
        res.sendFile('dist/pages/location-detail/main.css');
    });

    router.get('/location-calendar', function(req, res) {
        res.sendFile('dist/pages/location-calendar/location-calendar.html');
    });

    router.get('/location-calendar/main.js', function(req, res) {
        res.sendFile('dist/pages/location-calendar/main.js');
    });

    router.get('/location-calendar/main.css', function(req, res) {
        res.sendFile('dist/pages/location-calendar/main.css');
    });

    router.use('/location', locationRoute(param));
    router.use('/weather', weatherRoute(param));
    router.use('/image', imageRoute(param));
    router.use('/user', userRoute(param));

    return router;
};