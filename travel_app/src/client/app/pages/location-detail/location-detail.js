import './location-detail.scss';
import { LocationDetailServices } from './services';
import { createCountryCapital } from '../../components/country-capital/country-capital';

const services = LocationDetailServices.getInstance();
services.setTemperatureUnit('celcius');
const data = JSON.parse(window.localStorage.getItem('data'));

function main() {
    const mainContainer = document.querySelector('#main-container');
    services.getCountryDetails(data.location.country).then(countryDetails => {
        mainContainer.appendChild(createCountryCapital(countryDetails));
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
    services.getCurrentWeather(location.latLng.lat, location.latLng.lng).then(currentWeatherData => {
        mainContainer.appendChild(createCurrentWeather(currentWeatherData));
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
}

setTimeout(main, 0);

export { services, data };