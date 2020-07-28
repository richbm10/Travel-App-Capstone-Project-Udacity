const axios = require('axios');

const WeatherServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    apis: {
                        weatherbitAPI: 'https://api.weatherbit.io/v2.0/',
                        openWeatherMapAPI: 'http://api.openweathermap.org/data/2.5/'
                    },
                    queryLocationCurrentWeather: function(latitude, longitude) {
                        return `weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_MAP_KEY}`;
                    },
                    queryLocationForecastWeather: function(latitude, longitude) {
                        return `forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`;
                    },
                    getCurrentWeather: async function(query) {
                        const response = await axios.get(this.apis.openWeatherMapAPI + query);
                        const { weather, main, sys } = response.data;
                        return { weather, main, sys };
                    },
                    getForecastWeather: async function(query) {
                        const response = await axios.get(this.apis.weatherbitAPI + query);
                        const dailyWeather = response.data.data;
                        const responseDailyWeather = dailyWeather.map((day) => {
                            const { pop, max_temp, min_temp, weather } = day;
                            return { pop, max_temp, min_temp, weather };
                        });
                        return { responseDailyWeather };
                    }
                };
            }
            return instance;
        }
    };
})();

exports.WeatherServices = WeatherServices;