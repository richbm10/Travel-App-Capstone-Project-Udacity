const express = require('express');

const service = express();

/* Dependencies */
const bodyParser = require('body-parser');
service.use(bodyParser.urlencoded({ extended: false }));
service.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
service.use(cors());

const { UserServices } = require('./lib/User');

module.exports = (config) => {
    const log = config.log();

    const userServices = UserServices.getInstance();

    // Add a request logging middleware in development mode
    if (service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    service.get('/user/:username', (req, res, next) => {
        try {
            const data = userServices.getUser(req.params.username);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    service.put('/user/trip/:userId', (req, res, next) => {
        try {
            const message = userServices.createTrip(req.params.userId, req.body);
            return res.send(message);
        } catch (err) {
            return next(err);
        }
    });

    service.post('/user/trip/:userId', (req, res, next) => {
        try {
            const message = userServices.updateTrip(req.params.userId, req.body);
            return res.send(message);
        } catch (err) {
            return next(err);
        }
    });

    service.delete('/user/trip/:userId/:tripId', (req, res, next) => {
        try {
            const message = userServices.deleteTrip(req.params.userId, req.params.tripId);
            return res.send(message);
        } catch (err) {
            return next(err);
        }
    });

    // eslint-disable-next-line no-unused-vars
    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        // Log out the error to the console
        log.error(error);
        return res.send({
            error: {
                status: error.status,
                message: error.message,
            },
        });
    });
    return service;
};