const axios = require('axios');

/*
(MUST BE TESTED)
The idea of the CircuitBraker is to have a cache of the most recent data requested to a specific endpoint.
So, in case that a micro-service is down, the data can be retrieved from the cache.
The CircuitBraker has 3 states: closed, open, and half. It is always open unless that a request to a service
responds with a 404, in that case the CircuitBraker pass to the state of open. In the state of open every
time that a micro-service is requested the CircuitBraker blocks the request because it already knows that
the service is not available. When the time for the next try (based on the cooldownPeriod) passes, then
the CircuitBraker passes to a half state, in which it has 1 try for requesting the micro service. If
on that try the micro service also is down, the CircuitBraker gets back to the open state. But, if
it could retrieve the data, then the CircuitBraker passes to the close state.
*/
class CircuitBraker {
    constructor() {
        this.states = {};
        this.failureThreshold = 5;
        this.cooldownPeriod = 10;
        this.requestTimeout = 1; //changed from 1
    }

    async callService(requestOptions) {
        const endpoint = `${requestOptions.method}:${requestOptions.url}`;

        if (!this.canRequest(endpoint))
            return false;

        requestOptions.timeout = this.requestTimeout * 1000;

        try {
            const response = await axios(requestOptions);
            this.onSuccess(endpoint);
            return response.data;
        } catch (err) {
            this.onFailure(endpoint);
            return false;
        }
    }

    onSuccess(endpoint) {
        this.initState(endpoint);
    }

    onFailure(endpoint) {
        const state = this.states[endpoint];
        state.failures += 1;
        if (state.failures > this.failureThreshold) {
            state.circuit = 'OPEN';
            state.nextTry = new Date() / 1000 + this.cooldownPeriod;
            console.log(`ALERT! Circuit for ${endpoint} is in state 'OPEN'`);
        }
    }

    canRequest(endpoint) {
        if (!this.states[endpoint]) this.initState(endpoint);
        const state = this.states[endpoint];
        if (state.circuit === 'CLOSED')
            return true;
        const now = new Date() / 1000;
        if (state.nextTry <= now) {
            state.circuit = 'HALF';
            return true;
        }
        return false;
    }

    initState(endpoint) {
        this.states[endpoint] = {
            failures: 0,
            cooldownPeriod: this.cooldownPeriod,
            circuit: 'CLOSED',
            nextTry: 0,
        };
    }
}

module.exports = CircuitBraker;