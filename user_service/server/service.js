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

    // Add a request logging middleware in development mode
    if (service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    service.get('/list', async(req, res, next) => {
        try {
            //return res.json(await speakers.getList());
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