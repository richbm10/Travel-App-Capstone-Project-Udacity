const LocationServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    apis = {
                        countriesAPI: 'https://restcountries.eu/rest/v2/'
                    },
                    serviceData: {},
                    queryCountryISOCode: function(isoCode) {
                        return `alpha/${isoCode}`;
                    },
                    getCountryDetails: async function(query, resolve, reject) {
                        try {
                            const data = await axios.get(this.apis.countriesAPI + query);
                            return resolve(data);
                        } catch (error) {
                            return reject(err);
                        }
                    }
                };
            }
            return instance;
        }
    };
})();

exports.LocationServices = LocationServices;