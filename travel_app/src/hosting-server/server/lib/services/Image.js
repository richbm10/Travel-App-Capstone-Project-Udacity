const axios = require('axios');
const url = require('url');
const crypto = require('crypto');

const CircuitBraker = require('../CircuitBraker');
const circuitBraker = new CircuitBraker();

const ImageServices = (function() {
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
                    getImages: async function(address) {
                        const { ip, port } = await this.getService('image_service');
                        return this.callService({
                            method: 'get',
                            url: `http://${ip}:${port}/images/location/${address}`
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

exports.ImageServices = ImageServices;