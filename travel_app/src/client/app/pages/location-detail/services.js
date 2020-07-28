const LocationDetailServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    temperatureUnit: 'kelvin',
                    countries: [],
                    baseLocationCountryEndpoint: '/location/country/',
                    getCountryDetails: async function(isoCode) {
                        const response = await fetch(this.baseLocationCountryEndpoint + isoCode);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    }
                };
            }
            return instance;
        }
    };
})();

export { LocationDetailServices };