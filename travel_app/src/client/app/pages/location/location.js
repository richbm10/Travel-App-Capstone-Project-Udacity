import './location.scss';
import { LocationServices } from './services';
import { setSelectCombo } from '../../components/select-combo/select-combo';

const services = LocationServices.getInstance();

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

export { services };