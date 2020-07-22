import sunriseIcon from '../../../assets/icons/sun.svg';
import sunsetIcon from '../../../assets/icons/sunset.svg';

function createTemp(temperature) {
    const temp = document.createElement('div');
    temp.classList.add('current-weather__temp', 'row-container');
    const obj = createObj('current-weather__temp-icon');
    const span = document.createElement('span');
    span.classList.add('hero-text');
    span.textContent = `${temperature}°`;
    temp.appendChild(obj);
    temp.appendChild(span);
    return temp;
}

function utcToLocalTime(utc) {
    return (new Date(utc * 1000)).toLocaleTimeString(); //From https://stackoverflow.com/users/2030565/jasen
}

function createSchedule(utc, type, icon) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    const objId = `current-weather__${type}-icon`;
    const displayType = type === 'sunrise' ? 'Sunrise' : 'Sunset';
    const obj = document.createElement('object');
    obj.id = objId;
    obj.data = icon;
    obj.setAttribute('type', 'image/svg+xml');
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
    span.textContent = `${currentWeather.main.temp_max}° max`;
    columnContainer.appendChild(span);
    span = span.cloneNode(false);
    span.textContent = `${currentWeather.main.temp_min}° min`;
    columnContainer.appendChild(span);
    description.appendChild(columnContainer);
    columnContainer = columnContainer.cloneNode();
    span = span.cloneNode(false);
    span.textContent = `Feels like ${currentWeather.main.feels_like}°`;
    columnContainer.appendChild(span);
    span = span.cloneNode(false);
    span.textContent = currentWeather.weather.main;
    columnContainer.appendChild(span);
    description.appendChild(columnContainer);
    return description;
}

function setCurrentWeather(currentWeather) {
    const currentWeather = document.querySelector('.current-weather');
    const children = [createTemp(currentWeather.main.temp), createSunriseSunset(currentWeather.sys), createDescription(currentWeather)];
    for (let child of children) {
        currentWeather.appendChild(child);
    }
    return currentWeather;
}

export { setCurrentWeather };