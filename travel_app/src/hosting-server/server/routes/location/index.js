const express = require('express');

const router = express.Router();

module.exports = (config) => {

    router.get('/', function(req, res) {
        //res.sendFile('dist/index.html');
    });

    router.get('/', function(req, res) {
        if (req.query.lat !== undefined && req.query.long !== undefined && req.query.location !== undefined) {
            const [isoCountry, location] = req.query.location.split('-');

        }
    });

    router.get('/location-detail', function(req, res) {
        //res.sendFile('dist/index.html');
    });

    return router;
};