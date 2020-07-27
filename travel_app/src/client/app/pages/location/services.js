const LocationServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    temperatureUnit: 'kelvin',
                    countries: [],
                    baseLocationImageEndpoint: '/image/location/',
                    baseLocationCountriesEndpoint: '/location/countries',
                    baseLocationEndpoint: '/location/',
                    baseWeatherEndpoint: '/weather/current/',
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
                        resData.main.temp = this.convertTemperature(resData.main.temp);
                        resData.main.temp_min = this.convertTemperature(resData.main.temp_min);
                        resData.main.temp_max = this.convertTemperature(resData.main.temp_max);
                        resData.weather = resData.weather[0];
                        return resData;
                    },
                    getImages: async function(locations) {
                        const location = locations[0];
                        const query = `${location}/3`;
                        const response = await fetch(this.baseLocationImageEndpoint + query);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return [resData];
                    },
                    setCountries: function(pCountries) {
                        this.countries = pCountries;
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

export { LocationServices };