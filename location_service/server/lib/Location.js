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
                        const response = await axios.get(this.apis.countriesAPI + query);
                        console.log('CountriesAPIResponse', response.data);
                        return response.data;
                    }
                };
            }
            return instance;
        }
    };
})();

exports.LocationServices = LocationServices;