import './index.scss';
import { IndexServices } from './services';
import { createHeroSlideLocation } from '../../components/hero-slide-location/hero-slide-location';
import { createTripCards } from '../../components/trip-card/trip-card';

const tripPageReference = '../trip/trip.html';

document.querySelector('#add-button-a').setAttribute('href', tripPageReference);

const services = IndexServices.getInstance();
let user;
services.getUser('richi_bonilla10').then(data => {
    user = data;
    console.log(user);
    createTripCards();
}).catch(err => {
    console.log('ERROR', err);
    alert(err);
});

export { services, user, createHeroSlideLocation };