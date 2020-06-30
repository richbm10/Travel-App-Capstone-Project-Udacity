const axios = require('axios');
const url = require('url');
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');

const fsexists = util.promisify(fs.exists);

const CircuitBraker = require('../CircuitBraker');
const circuitBraker = new CircuitBraker();

const LocationServices = (function() {
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
                        let cacheFile = null;

                        if (requestOptions.responseType && requestOptions.responseType === 'stream') {
                            cacheFile = `${__dirname}/../../_imagecache/${cacheKey}`;
                        }

                        const result = await circuitBraker.callService(requestOptions);

                        if (!result) {
                            if (this.cache[cacheKey]) return this.cache[cacheKey];
                            if (cacheFile) {
                                const exists = await fsexists(cacheFile);
                                if (exists) return fs.createReadStream(cacheFile);
                            }
                            return false;
                        }

                        if (!cacheFile) {
                            this.cache[cacheKey] = result;
                        } else {
                            const ws = fs.createWriteStream(cacheFile);
                            result.pipe(ws);
                        }
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

exports.LocationServices = LocationServices;