const express = require('express');
const configs = require('../config');
const routes = require('./routes');

const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('dist'));

/* Set environment variables */
const dotenv = require('dotenv');
dotenv.config();

const { LocationServices } = require('./lib/services/Location');

const config = configs[app.get('env')];

const locationServices = LocationServices.getInstance();
locationServices.setInstance(config);

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.get('/service-worker.js', (req, res) => res.sendStatus(404));

app.get('/service-worker.js.map', (req, res) => res.sendStatus(404));

app.get('/workbox-64f1e998.js.map', (req, res) => res.sendStatus(404));

const log = config.log();

// Add a request logging middleware in development mode
if (app.get('env') === 'development') {
    app.use((req, res, next) => {
        log.debug(`${req.method}: ${req.url}`);
        return next();
    });
}

app.use('/', routes({
    log,
    locationServices
}));

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.send({
        error: {
            message: error.message,
        },
    });
});

app.listen(process.env.PORT || config.hostPort, () => {
    log.info(
        `Hi there! I'm listening on port ${process.env.PORT || config.hostPort} in ${app.get('env')} mode.`,
    );
});

module.export = app;