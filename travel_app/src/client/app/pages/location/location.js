import './location.scss';
import { LocationServices } from './services';
import { setSelectCombo } from '../../components/select-combo/select-combo';
import { setCurrentWeather } from '../../components/current-weather/current-weather';

const services = LocationServices.getInstance();
services.setTemperatureUnit('celcius');

function main() {
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

export { services, setCurrentWeather };