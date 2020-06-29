const express = require('express');

const router = express.Router();

const locationRoute = require('./location');

module.exports = (param) => {
    const { log } = param;

    router.get('/', function(req, res) {
        // res.sendFile('dist/index.html');
    });

    router.use('/location', locationRoute(param));

    return router;
};