const express = require('express');
const bodyParser = require('body-parser');
const configs = require('./config');
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

const config = configs[app.get('env')];


app.get('/favicon.ico', (req, res) => res.sendStatus(204));

const log = config.log();

// Add a request logging middleware in development mode
if (app.get('env') === 'development') {
    app.use((req, res, next) => {
        log.debug(`${req.method}: ${req.url}`);
        return next();
    });
}

app.use('/', routes({
    log
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

app.listen(8000);

app.on('listening', () => {
    log.info(
        `Hi there! I'm listening on port ${server.address().port} in ${service.get('env')} mode.`,
    );
});

module.export = app;