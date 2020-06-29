const axios = require('axios');

const LocationServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    apis: {
                        countriesAPI: 'https://restcountries.eu/rest/v2/'
                    },
                    serviceData: {},
                    queryCountryISOCode: function(isoCode) {
                        return `alpha/${isoCode}`;
                    },
                    getCountryDetails: async function(query) {
                        const data = await axios.get(this.apis.countriesAPI + query);
                        return data;
                    }
                };
            }
            return instance;
        }
    };
})();

exports.LocationServices = LocationServices;