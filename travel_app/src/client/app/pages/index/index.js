import './index.scss';
import { IndexServices } from './services';
import { createTripCards } from '../../components/trip-card/trip-card';

const user = IndexServices.getInstance().getUser('richi_bonilla10');

createTripCards(); //TODO check if it is ok to call the function here.

export { user };