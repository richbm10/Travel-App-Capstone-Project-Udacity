const LocationServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    countries: [],
                    baseLocationCountriesEndpoint: '/location/countries',
                    baseLocationEndpoint: '/location/',
                    baseWeatherEndpoint: '/weather/current/',
                    getCountries: async function() {
                        const response = await fetch(this.baseLocationCountriesEndpoint);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    },
                    getAddressLocations: async function(address) {
                        const response = await fetch(this.baseLocationEndpoint + address);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    },
                    getCurrentWeather: async function(latitude, longitude) {
                        const response = await fetch(`${this.baseWeatherEndpoint}${latitude}/${longitude}`);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    },
                    setCountries: function(pCountries) {
                        this.countries = pCountries;
                    }
                };
            }
            return instance;
        }
    };
})();

export { LocationServices };