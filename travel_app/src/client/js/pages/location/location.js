import '../../../styles/pages/location.scss';
import { LocationServices } from './services';
import { setSelectCombo } from '../../components/select-combo';
import { createCurrentWeather } from '../../components/current-weather';
import { createHeroSlideLocation } from '../../components/hero-slide-location';

const services = LocationServices.getInstance();
services.setTemperatureUnit('celcius');
const data = JSON.parse(window.localStorage.getItem('data'));
data['location'] = {
    city: '',
    county: '',
    state: '',
    country: '',
    latLng: { lat: null, lng: null }
};

function setCurrentWeather(currentWeatherData) {
    const locationData = document.querySelector('#location-data');
    locationData.appendChild(createCurrentWeather(currentWeatherData));
}

function createLocationPhotos(heroSlide) {
    const container = new DocumentFragment();
    const header = document.createElement('h2');
    header.classList.add('text-A');
    header.textContent = 'Photos';
    container.appendChild(header);
    container.appendChild(heroSlide);
    return container;
}

function setLocationPhotos(heroSlide) {
    const locationData = document.querySelector('#location-data');
    locationData.appendChild(createLocationPhotos(heroSlide));
}

function removeLocationData() {
    document.querySelector('#location-data').innerHTML = '';
}

function main() {
    document.querySelector('header a').addEventListener('click', () => {
        if (data.location.location !== '') {
            data.location['fromDate'] = '';
            data.location['toDate'] = '';
            data.location['flag'] = '';
            window.localStorage.setItem('data', JSON.stringify(data));
            window.location.href = '../../pages/location-detail/location-detail.html';
        }
    });

    services.getCountries().then(countries => {
        services.setCountries(countries);

        setSelectCombo('#country-search');

        setSelectCombo('#location-search');
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
}

setTimeout(main, 0);

export { services, setCurrentWeather, createHeroSlideLocation, setLocationPhotos, removeLocationData, data };