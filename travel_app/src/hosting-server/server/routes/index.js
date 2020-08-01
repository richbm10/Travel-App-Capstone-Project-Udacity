const express = require('express');
const path = require('path');

const router = express.Router();

const locationRoute = require('./location');
const weatherRoute = require('./weather');
const imageRoute = require('./image');
const userRoute = require('./user');

module.exports = (param) => {

    router.get('', function(req, res) {
        const indexPath = path.join(__dirname, '../dist/pages/index/index.html');
        res.sendFile(indexPath);
    });

    router.use('/location', locationRoute(param));
    router.use('/weather', weatherRoute(param));
    router.use('/image', imageRoute(param));
    router.use('/user', userRoute(param));

    return router;
};