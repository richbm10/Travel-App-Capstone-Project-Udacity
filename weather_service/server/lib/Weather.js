const axios = require('axios');

const WeatherServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    apis: {
                        weatherbitAPI: 'https://api.weatherbit.io/v2.0/'
                    },
                    queryLocationCurrentWeather: function(latitude, longitude) {
                        return `current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`;
                    },
                    queryLocationForecastWeather: function(latitude, longitude) {
                        return `forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`;
                    },
                    getWeather: async function(query) {
                        const response = await axios.get(this.apis.weatherbitAPI + query);
                        return response.data;
                    }
                };
            }
            return instance;
        }
    };
})();

exports.WeatherServices = WeatherServices;