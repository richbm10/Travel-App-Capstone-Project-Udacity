import './location-detail.scss';
import { LocationDetailServices } from './services';

const services = LocationDetailServices.getInstance();
services.setTemperatureUnit('celcius');
const data = JSON.parse(window.localStorage.getItem('data'));

function main() {
    services.getCountryDetails().then(countryDetails => {}).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
}

setTimeout(main, 0);

export { services, data };