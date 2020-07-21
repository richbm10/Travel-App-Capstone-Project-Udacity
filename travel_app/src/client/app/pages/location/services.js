const LocationServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    countries: [],
                    baseLocationCountriesEndpoint: '/location/countries',
                    getCountries: async function() {
                        const response = await fetch(this.baseLocationCountriesEndpoint);
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