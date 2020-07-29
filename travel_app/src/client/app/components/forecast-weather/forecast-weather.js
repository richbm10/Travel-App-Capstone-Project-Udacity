import climateIcon from '../../../assets/icons/climate.svg';
import waterIcon from '../../../assets/icons/water.svg';

function dayOfWeek(index) {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const currentDayOfWeek = (new Date()).getDay();
    const day = (currentDayOfWeek + (index % 7)) % 7;
    return daysOfWeek[day];
}

function createObject(cssClass, icon) {
    const obj = document.createElement('object');
    obj.classList.add(cssClass);
    obj.setAttribute('type', 'image/svg+xml');
    obj.data = icon;
    return obj;
}

function createRain(rainProbability) {
    const rain = document.createElement('div');
    rain.classList.add('row-container');
    const obj = createObject('forecast-weather__rain-icon', waterIcon);
    const span = document.createElement('span');
    span.classList.add('text-D');
    span.textContent = `${rainProbability}%`;
    rain.appendChild(obj);
    rain.appendChild(span);
    return rain;
}

function createForecastWeatherDay(day, dayIndex) {
    const forecastWeatherDay = document.createElement('div');
    forecastWeatherDay.classList.add('column-container-A', 'forecast-weather__day');
    let span = document.createElement('span');
    span.textContent = dayOfWeek(dayIndex);
    forecastWeatherDay.appendChild(span);
    const obj = createObject('forecast-weather__temp-icon', climateIcon);
    forecastWeatherDay.appendChild(obj);
    const rain = createRain(day.pop);
    forecastWeatherDay.appendChild(rain);
    span = span.cloneNode(false);
    span.textContent = day.max_temp;
    forecastWeatherDay.appendChild(span);
    const line = document.createElement('div');
    line.classList.add('forecast-weather__v-line');
    forecastWeatherDay.appendChild(line);
    span = span.cloneNode(false);
    span.textContent = day.min_temp;
    forecastWeatherDay.appendChild(span);
    return forecastWeatherDay;
}

function createForecastWeatherDays(forecastWeatherData, index, limit) {
    const forecastWeatherDays = document.createElement('div');
    forecastWeatherDays.classList.add('row-container', 'forecast-weather__days');
    for (let i = index; i < limit; i++) {
        forecastWeatherDays.appendChild(createForecastWeatherDay(forecastWeatherData[i], i));
    }
    return forecastWeatherDays;
}


function createForecastWeatherContent(forecastWeatherData) {
    const container = new DocumentFragment();
    let iterations = Math.floor(forecastWeatherData.length / 6);
    const lastDays = forecastWeatherData.length % 6;
    if (lastDays > 0) iterations += 1;
    iterations -= 1;
    let index = 1;
    while (iterations >= 0) {
        if (iterations === 0) {
            container.appendChild(createForecastWeatherDays(forecastWeatherData, index - 1, lastDays));
        } else {
            container.appendChild(createForecastWeatherDays(forecastWeatherData, index - 1, 6));
        }
        index += 6;
        iterations--;
    }
    return container;
}

function createForecastWeather(forecastWeatherData) {
    const container = new DocumentFragment();
    const header = document.createElement('h2');
    header.classList.add('text-A');
    header.textContent = 'Daily Forecast';
    const forecastWeather = document.createElement('div');
    forecastWeather.classList.add('forecast-weather', 'text-C');
    forecastWeather.appendChild(createForecastWeatherContent(forecastWeatherData));
    container.appendChild(header);
    container.appendChild(forecastWeather);
    return container;
}

export { createForecastWeather }