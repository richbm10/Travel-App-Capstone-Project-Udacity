/*
Singleton Pattern Design for requesting locations data on each micro-service endpoint.
Services:
    - getCountries: if the query is queryCountries retrieves all the countries from the restcountriesAPI, and if
    the query is queryCountry retrieves: capital, currency, population, and country name of a given country iso code.
    - getAddress: retrieves city, state, county, country, latitude, and longitude from the MapQuestGeocodingAPI based on a given address.
*/


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
                    queryCountry: function(isoCode) {
                        return `alpha/${isoCode}?fields=name;capital;population;flag;currencies`;
                    },
                    queryCountries: 'all?fields=name;flag',
                    queryAddress: function(location) {
                        return `address/?key=${process.env.MAPQUEST_KEY}&location=${location}`;
                    },
                    getCountries: async function(query) {
                        const response = await axios.get(this.apis.countriesAPI + query);
                        return response.data;
                    },
                    getAddress: async function(query) {
                        const response = await axios.get(this.apis.mapQuestGeocodingAPI + query);
                        const dataLocations = response.data.results[0].locations;
                        const responseLocations = dataLocations.map((dataLocation) => {
                            const { adminArea5, adminArea4, adminArea3, adminArea1, latLng } = dataLocation;
                            return { city: adminArea5, county: adminArea4, state: adminArea3, country: adminArea1, latLng };
                        });
                        return { responseLocations };
                    }
                };
            }
            return instance;
        }
    };
})();

exports.LocationServices = LocationServices;