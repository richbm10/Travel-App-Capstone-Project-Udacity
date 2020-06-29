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

const { LocationServices } = require('./lib/Location');

module.exports = (config) => {
    const log = config.log();

    const locationServices = LocationServices.getInstance();

    // Add a request logging middleware in development mode
    if (service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    service.get('/location/country/:iso', async(req, res, next) => {
        const query = locationServices.queryCountryISOCode(req.params.iso);
        try {
            const data = await locationServices.getCountryDetails(query);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    service.get('/location/:address', async(req, res, next) => {
        const query = locationServices.queryAddress(req.params.address);
        try {
            const data = await locationServices.getAddress(query);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        // Log out the error to the console
        log.error(error);
        return res.send({
            error: {
                message: error.message,
            },
        });
    });
    return service;
};