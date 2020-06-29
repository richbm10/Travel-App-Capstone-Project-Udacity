const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { log, locationServices } = param;

    router.get('/', function(req, res) {
        //res.sendFile('dist/index.html');
    });

    // router.get('/location-detail', function(req, res) {
    //     console.log('BOMBOCLAT-1');
    //     //res.sendFile('dist/index.html');
    // });

    /*
        Input: latitude, longitude, and location.
        Process: fetches all the required data for the location-detail page from
        the micro-services.
        Ouput: location-detail page data.
    */
    router.get('/location-detail', async function(req, res, next) {
        //Must call multiple promises for the page data
        const promises = [];
        if (req.query.location !== undefined) {
            const qLocation = req.query.location.split(';');
            if (qLocation.length === 2) {
                const [isoCountry, location] = qLocation;
                promises.push(locationServices.getCountryDetails(isoCountry));
            }
        }

        // if (req.query.lat !== undefined && req.query.long !== undefined) {}

        try {
            const data = await Promise.all(promises);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    return router;
};