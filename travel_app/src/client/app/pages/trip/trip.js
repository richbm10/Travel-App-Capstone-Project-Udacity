import './trip.scss';
import { TripServices } from './services';
import { setFooter } from '../../components/footer/footer';

const services = TripServices.getInstance();
const user = window.localStorage.getItem('user');
const data = {
    id: -1,
    name: '',
    checkList: [],
    notes: '',
    locations: []
};

window.localStorage.setItem('data', data);

setFooter('../index/index.html');

export { user, data, services };