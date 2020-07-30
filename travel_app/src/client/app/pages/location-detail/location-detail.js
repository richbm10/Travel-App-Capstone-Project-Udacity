import './location-detail.scss';
import { LocationDetailServices } from './services';
import { createHeroContent } from '../../components/hero-header/hero-header';
import { createHeroSlideLocation } from '../../components/hero-slide-location/hero-slide-location';
import { createCountryCapital } from '../../components/country-capital/country-capital';
import { createCurrentWeather } from '../../components/current-weather/current-weather';
import { createForecastWeather } from '../../components/forecast-weather/forecast-weather';

const services = LocationDetailServices.getInstance();
services.setTemperatureUnit('celcius');
const data = JSON.parse(window.localStorage.getItem('data'));

function main() {
    document.querySelector('header a').href = '../../pages/location-calendar/location-calendar.html';
    const mainContainer = document.querySelector('#main-container');
    const heroHeader = document.querySelector('.hero-header');
    const promises = [];
    const queryLocation = `${ data.location.city !== '' ? (data.location.city + ', ') : ''}${data.location.state}${ data.location.county !== '' ? (' ' + data.location.county) : '' }`;
    promises.push(createHeroSlideLocation([queryLocation]));
    promises.push(services.getCountryDetails(data.location.country));
    promises.push(services.getCurrentWeather(data.location.latLng.lat, data.location.latLng.lng));
    promises.push(services.getForecastWeather(data.location.latLng.lat, data.location.latLng.lng));
    Promise.all(promises).then(data => {
        const heroSlide = data[0];
        const countryDetails = data[1];
        const currentWeatherData = data[2];
        const forecastWeatherData = data[3];
        heroHeader.appendChild(createHeroContent(heroSlide));
        mainContainer.appendChild(createCountryCapital(countryDetails));
        mainContainer.appendChild(createCurrentWeather(currentWeatherData));
        mainContainer.appendChild(createForecastWeather(forecastWeatherData));
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
}

setTimeout(main, 0);

export { services, data };