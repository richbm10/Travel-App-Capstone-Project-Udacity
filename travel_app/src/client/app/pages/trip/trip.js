import './trip.scss';
import { TripServices } from './services';
import { createLineInput } from '../../components/line-input/line-input';
import { setCheckList } from '../../components/check-list/check-list';
import { setLocationCards } from '../../components/location-card/location-card';
import { setFooter } from '../../components/footer/footer';

const services = TripServices.getInstance();
const data = JSON.parse(window.localStorage.getItem('data'));
if (data.trip === undefined) data['trip'] = {
    name: '',
    checkList: [],
    notes: '',
    locations: []
};

function main() {
    setCheckList(document.querySelector('#check-list'));

    setLocationCards(document.querySelector('#locations'));

    document.querySelector('#add-button-a').addEventListener('click', () => {
        window.localStorage.setItem('data', JSON.stringify(data));
        window.location.href = '../../pages/location/location.html';
    });

    setFooter(document.querySelector('footer'), '../../pages/index/index.html');
}

setTimeout(main, 0);

export { services, data, createLineInput };