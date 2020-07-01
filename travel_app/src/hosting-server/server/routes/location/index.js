const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { locationServices } = param;

    router.get('/location/country/:iso', async(req, res, next) => {
        try {
            const data = await locationServices.getCountryDetails(req.params.iso);
            console.log(data);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    router.get('/location/countries', async(req, res, next) => {
        try {
            const data = await locationServices.getCountries();
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    router.get('/location/:address', async(req, res, next) => {
        try {
            const data = await locationServices.getAddress(req.params.address);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    return router;
};