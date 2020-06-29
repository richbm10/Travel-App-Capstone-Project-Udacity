const axios = require('axios');

const LocationServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    apis: {
                        countriesAPI: 'https://restcountries.eu/rest/v2/',
                        mapQuestGeocodingAPI: 'http://www.mapquestapi.com/geocoding/v1/'
                    },
                    serviceData: {},
                    queryCountryISOCode: function(isoCode) {
                        return `alpha/${isoCode}?fields=name;capital;population;flag;currencies`;
                    },
                    queryAddress: function(location) {
                        return `address/?key=${process.env.MAPQUEST_KEY}&location=${location}`;
                    },
                    getCountryDetails: async function(query) {
                        const response = await axios.get(this.apis.countriesAPI + query);
                        return response.data;
                    },
                    getAddress: async function(query) {
                        const response = await axios.get(this.apis.mapQuestGeocodingAPI + query);
                        return response.data;
                    }
                };
            }
            return instance;
        }
    };
})();

exports.LocationServices = LocationServices;