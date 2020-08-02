const path = require('path');
const bunyan = require('bunyan');
// Load package.json
const pjs = require('../../../package.json');

// Get some meta info from the package.json
const { name, servicesVersion } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

// Configuration options for different environments
module.exports = {
    development: {
        name,
        hostPort: 8030,
        servicesVersion,
        serviceRegistryUrl: 'http://localhost:3000',
        log: () => getLogger(name, servicesVersion, 'debug'),
    },
    production: {
        name,
        hostPort: 8030,
        servicesVersion,
        serviceRegistryUrl: 'http://localhost:3000',
        log: () => getLogger(name, servicesVersion, 'info'),
    },
    test: {
        name,
        hostPort: 8030,
        servicesVersion,
        serviceRegistryUrl: 'http://localhost:3000',
        log: () => getLogger(name, servicesVersion, 'fatal'),
    },
};