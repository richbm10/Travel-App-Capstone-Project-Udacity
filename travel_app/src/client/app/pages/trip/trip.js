import './trip.scss';
import { TripServices } from './services';
import { createLineInput } from '../../components/line-input/line-input';
import { setCheckList } from '../../components/check-list/check-list';
import { setLocationCards } from '../../components/location-card/location-card';
import { setFooter } from '../../components/footer/footer';

const services = TripServices.getInstance();
const data = JSON.parse(window.localStorage.getItem('data'));
data['trip'] = {
    name: '',
    checkList: [],
    notes: '',
    locations: [],
    setName: function(pName) {
        this.name = pName;
    },
    setNotes: function(pNotes) {
        this.notes = pNotes;
    }
};

setCheckList();

setLocationCards();

document.querySelector('#add-button-a').setAttribute('href', '../location/location.html');

setFooter('../index/index.html');

export { services, data, createLineInput };