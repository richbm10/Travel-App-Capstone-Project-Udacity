const LocationServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    serviceData: {},
                    callService: async(requestOptions) => {
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
                    getService: async(servicename) => {
                        const response = await axios.get(`${this.serviceRegistryUrl}/find/${servicename}/${this.serviceVersionIdentifier}`);
                        return response.data;
                    }
                };
            }
            return instance;
        }
    };
})();

exports.LocationServices = LocationServices;