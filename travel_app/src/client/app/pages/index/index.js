import './index.scss';
import { IndexServices } from './services';
import { createHeroSlideLocation } from '../../components/hero-slide-location/hero-slide-location';
import { createTripCards } from '../../components/trip-card/trip-card';

const services = IndexServices.getInstance();
let data = {};
services.getUser('richi_bonilla10').then(user => {
    data['user'] = user;
    console.log(data);
    createTripCards();
    document.querySelector('#add-button-a').setAttribute('href', '../../pages/trip/trip.html');
    window.localStorage.setItem('data', JSON.stringify(data));
}).catch(err => {
    console.log('ERROR', err);
    alert(err);
});

export { services, data, createHeroSlideLocation };