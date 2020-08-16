const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { weatherServices } = param;

    router.get('/current/:lat/:lon', async(req, res, next) => {
        try {
            const data = await weatherServices.getCurrentWeather(req.params.lat, req.params.lon);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    router.get('/forecast/:lat/:lon', async(req, res, next) => {
        try {
            const data = await weatherServices.getForecastWeather(req.params.lat, req.params.lon);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    return router;
};