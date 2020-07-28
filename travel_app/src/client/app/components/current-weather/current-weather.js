import sunriseIcon from '../../../assets/icons/sun.svg';
import sunsetIcon from '../../../assets/icons/sunset.svg';
import climateIcon from '../../../assets/icons/climate.svg';

function createObj(id, icon) {
    const obj = document.createElement('object');
    obj.id = id;
    obj.data = icon;
    obj.setAttribute('type', 'image/svg+xml');
    return obj;
}

function createTemp(temperature) {
    const temp = document.createElement('div');
    temp.classList.add('current-weather__temp', 'row-container');
    const obj = createObj('current-weather__temp-icon', climateIcon);
    const span = document.createElement('span');
    span.classList.add('hero-text');
    span.textContent = `${temperature}°C`;
    temp.appendChild(obj);
    temp.appendChild(span);
    return temp;
}

function utcToLocalTime(utc) {
    return (new Date(utc * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); //From https://stackoverflow.com/users/2030565/jasen
}

function createSchedule(utc, type, icon) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    const objId = `current-weather__${type}-icon`;
    const displayType = type === 'sunrise' ? 'Sunrise' : 'Sunset';
    const obj = createObj(objId, icon);
    const columnContainer = document.createElement('div');
    columnContainer.classList.add('column-container-B');
    let span = document.createElement('span');
    span.textContent = displayType;
    columnContainer.appendChild(span);
    span = document.createElement('span');
    span.textContent = utcToLocalTime(utc);
    columnContainer.appendChild(span);
    rowContainer.appendChild(obj);
    rowContainer.appendChild(columnContainer);
    return rowContainer;
}

function createSunriseSunset(schedules) {
    const sunriseSunset = document.createElement('div');
    sunriseSunset.classList.add('current-weather__sunrise-sunset');
    const sunrise = createSchedule(schedules.sunrise, 'sunrise', sunriseIcon);
    const sunset = createSchedule(schedules.sunset, 'sunset', sunsetIcon);
    sunriseSunset.appendChild(sunrise);
    sunriseSunset.appendChild(sunset);
    return sunriseSunset;
}

function createDescription(currentWeather) {
    const description = document.createElement('div');
    description.classList.add('row-container', 'current-weather__description');
    let columnContainer = document.createElement('div');
    columnContainer.classList.add('column-container-B');
    let span = document.createElement('span');
    span.textContent = `${currentWeather.main.temp_max}°C max`;
    columnContainer.appendChild(span);
    span = span.cloneNode(false);
    span.textContent = `${currentWeather.main.temp_min}°C min`;
    columnContainer.appendChild(span);
    description.appendChild(columnContainer);
    columnContainer = columnContainer.cloneNode();
    if (currentWeather.main.feels_like !== undefined) {
        span = span.cloneNode(false);
        span.textContent = `Sense ${currentWeather.main.feels_like}°C`;
        columnContainer.appendChild(span);
    }
    span = span.cloneNode(false);
    span.textContent = currentWeather.weather.main;
    columnContainer.appendChild(span);
    description.appendChild(columnContainer);
    return description;
}

function createCurrentWeather(currentWeatherData) {
    const container = new DocumentFragment();
    const header = document.createElement('h2');
    header.classList.add('text-A');
    header.textContent = 'Current Weather';
    const currentWeather = document.createElement('div');
    currentWeather.classList.add('current-weather', 'text-C');
    const children = [createTemp(currentWeatherData.main.temp), createSunriseSunset(currentWeatherData.sys), createDescription(currentWeatherData)];
    for (let child of children) {
        currentWeather.appendChild(child);
    }
    container.appendChild(header);
    container.appendChild(currentWeather);
    return container;
}

export { createCurrentWeather };