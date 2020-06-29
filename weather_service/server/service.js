const express = require('express');

const service = express();

/* Dependencies */
const bodyParser = require('body-parser');
service.use(bodyParser.urlencoded({ extended: false }));
service.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
service.use(cors());

/* Set environment variables */
const dotenv = require('dotenv');
dotenv.config();

const { WeatherServices } = require('./lib/Weather');

module.exports = (config) => {
    const log = config.log();

    const weatherServices = WeatherServices.getInstance();

    // Add a request logging middleware in development mode
    if (service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    service.get('/weather/current/:lat/:lon', async(req, res, next) => {
        const query = weatherServices.queryLocationCurrentWeather(req.params.lat, req.params.lon);
        try {
            const data = await weatherServices.getCurrentWeather(query);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    service.get('/weather/forecast/:lat/:lon', async(req, res, next) => {
        const query = weatherServices.queryLocationForecastWeather(req.params.lat, req.params.lon);
        try {
            const data = await weatherServices.getForecastWeather(query);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    // eslint-disable-next-line no-unused-vars
    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        // Log out the error to the console
        log.error(error);
        return res.json({
            error: {
                message: error.message,
            },
        });
    });
    return service;
};