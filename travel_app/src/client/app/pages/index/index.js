import './index.scss';
import { IndexServices } from './services';
import { createHeroSlideLocation } from '../../components/hero-slide-location/hero-slide-location';
import { createTripCards } from '../../components/trip-card/trip-card';

const services = IndexServices.getInstance();
let data = {};

function main() {
    services.getUser('richi_bonilla10').then(user => {
        data['user'] = user;
        createTripCards();
        document.querySelector('#add-button-a').setAttribute('href', '../../pages/trip/trip.html?edit=' + 'false');
        window.localStorage.setItem('data', JSON.stringify(data));
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
}

setTimeout(main, 0);

export { services, data, createHeroSlideLocation };