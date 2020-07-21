const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { locationServices } = param;

    router.get('/country/:iso', async(req, res, next) => {
        try {
            const data = await locationServices.getCountryDetails(req.params.iso);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    router.get('/countries', async(req, res, next) => {
        try {
            const data = await locationServices.getCountries();
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    router.get('/:address', async(req, res, next) => {
        try {
            const data = await locationServices.getAddressLocations(req.params.address);
            return res.send(data.responseLocations);
        } catch (err) {
            return next(err);
        }
    });

    return router;
};