import './trip.scss';
import { TripServices } from './services';
import { setFooter } from '../../components/footer/footer';
import { createLineInput } from '../../components/line-input/line-input';
import { setCheckList } from '../../components/check-list/check-list';
import { setLocationCards } from '../../components/location-card/location-card';

const services = TripServices.getInstance();
const data = window.localStorage.getItem('data');
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

setFooter('../index/index.html');

export { data, services, createLineInput };