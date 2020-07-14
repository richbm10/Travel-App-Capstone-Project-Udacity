import './index.scss';
import { IndexServices } from './services';
import { createHeroSlideLocation } from '../../components/hero-slide-location/hero-slide-location';
import { createTripCards } from '../../components/trip-card/trip-card';

const services = IndexServices.getInstance();
let user;
services.getUser('richi_bonilla10').then(data => {
    user = data;
    createTripCards(); //TODO check if it is ok to call the function here.
}).catch(err => {
    alert(err);
});

export { services, user, createHeroSlideLocation };