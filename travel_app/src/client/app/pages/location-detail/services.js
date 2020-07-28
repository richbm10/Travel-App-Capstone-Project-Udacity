const LocationDetailServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    temperatureUnit: 'kelvin',
                    countries: [],
                    baseLocationCountryEndpoint: '/location/country/',
                    convertTemperature: function(temperature) {
                        switch (this.temperatureUnit) {
                            case 'celcius':
                                temperature = temperature - 273.15;
                                temperature = Math.round(temperature);
                                break;
                            default:
                                break;
                        }
                        return temperature;
                    },
                    getCountryDetails: async function(isoCode) {
                        const response = await fetch(this.baseLocationCountryEndpoint + isoCode);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    },
                    setTemperatureUnit: function(unit) {
                        this.temperatureUnit = unit;
                    }
                };
            }
            return instance;
        }
    };
})();

export { LocationDetailServices };