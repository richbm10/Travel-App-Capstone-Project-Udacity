const LocationDetailServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    temperatureUnit: 'kelvin',
                    countries: [],
                    baseLocationCountryEndpoint: '/location/country/',
                    baseWeatherEndpoint: '/weather/current/',
                    baseLocationImageEndpoint: '/image/location/',
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
                    getCurrentWeather: async function(latitude, longitude) {
                        const response = await fetch(`${this.baseWeatherEndpoint}${latitude}/${longitude}`);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        resData.main.temp = this.convertTemperature(resData.main.temp);
                        resData.main.temp_min = this.convertTemperature(resData.main.temp_min);
                        resData.main.temp_max = this.convertTemperature(resData.main.temp_max);
                        resData.main.feels_like = this.convertTemperature(resData.main.feels_like);
                        resData.weather = resData.weather[0];
                        return resData;
                    },
                    getForecastWeather: async function(latitude, longitude) {
                        const response = await fetch(`${this.baseWeatherEndpoint}${latitude}/${longitude}`);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        const convertedForecast = resData.responseDailyWeather.map(day => {
                            day.min_temp = this.convertTemperature(day.min_temp);
                            day.max_temp = this.convertTemperature(day.max_temp);
                        });
                        return convertedForecast;
                    },
                    getLocationImage: async function(location) {
                        const query = `${location}/1`;
                        const response = await fetch(this.baseLocationImageEndpoint + query);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData[0];
                    },
                    getImages: async function(locations) {
                        const location = locations[0];
                        const query = `${location}/3`;
                        const response = await fetch(this.baseLocationImageEndpoint + query);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return [resData];
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