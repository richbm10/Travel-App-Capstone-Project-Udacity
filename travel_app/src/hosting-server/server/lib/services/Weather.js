const axios = require('axios');
const url = require('url');
const crypto = require('crypto');

const CircuitBraker = require('../CircuitBraker');
const circuitBraker = new CircuitBraker();

/*
Singleton Pattern Design for requesting the weather micro-service from the ServiceRegistry, for then
calling it to get the weather data for each endpoint.
*/

const WeatherServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    serviceRegistryUrl: '',
                    servicesVersion: '',
                    cache: {},
                    setInstance: function({ serviceRegistryUrl, servicesVersion }) {
                        this.serviceRegistryUrl = serviceRegistryUrl;
                        this.servicesVersion = servicesVersion;
                    },
                    getCurrentWeather: async function(lat, lon) {
                        const { ip, port } = await this.getService('weather_service');
                        return this.callService({
                            method: 'get',
                            url: `http://${ip}:${port}/weather/current/${lat}/${lon}`
                        });
                    },
                    getForecastWeather: async function(lat, lon) {
                        const { ip, port } = await this.getService('weather_service');
                        return this.callService({
                            method: 'get',
                            url: `http://${ip}:${port}/weather/forecast/${lat}/${lon}`
                        });
                    },
                    callService: async function(requestOptions) {
                        const servicePath = url.parse(requestOptions.url).path;
                        const cacheKey = crypto.createHash('md5').update(requestOptions.method + servicePath).digest('hex');

                        const result = await circuitBraker.callService(requestOptions);

                        if (!result) {
                            if (this.cache[cacheKey]) return this.cache[cacheKey];
                            return false;
                        }

                        this.cache[cacheKey] = result;

                        return result;
                    },
                    getService: async function(servicename) {
                        const response = await axios.get(`${this.serviceRegistryUrl}/find/${servicename}/${this.servicesVersion}`);
                        return response.data;
                    }
                };
            }
            return instance;
        }
    };
})();

exports.WeatherServices = WeatherServices;