const axios = require('axios');
const url = require('url');
const crypto = require('crypto');

const CircuitBraker = require('../CircuitBraker');
const circuitBraker = new CircuitBraker();

/*
Singleton Pattern Design for requesting the user micro-service from the ServiceRegistry, for then
calling it to get the user data from the database.
*/

const UserServices = (function() {
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
                    getUser: async function(username) {
                        const { ip, port } = await this.getService('user_service');
                        return this.callService({
                            method: 'get',
                            url: `http://${ip}:${port}/user/${username}`
                        });
                    },
                    createTrip: async function(userId, trip) {
                        const { ip, port } = await this.getService('user_service');
                        return this.callService({
                            method: 'put',
                            url: `http://${ip}:${port}/user/trip/${userId}`,
                            data: trip
                        });
                    },
                    updateTrip: async function(userId, trip) {
                        const { ip, port } = await this.getService('user_service');
                        return this.callService({
                            method: 'post',
                            url: `http://${ip}:${port}/user/trip/${userId}`,
                            data: trip
                        });
                    },
                    deleteTrip: async function(userId, tripId) {
                        const { ip, port } = await this.getService('user_service');
                        return this.callService({
                            method: 'delete',
                            url: `http://${ip}:${port}/user/trip/${userId}/${tripId}`
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

exports.UserServices = UserServices;