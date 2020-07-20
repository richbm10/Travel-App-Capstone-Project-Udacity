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
    },
    setCheckList: function(callBack) {
        callBack(this.checkList);
    }
};

function main() {
    setCheckList();

    setLocationCards();

    document.querySelector('#add-button-a').setAttribute('href', '../../pages/location/location.html');

    setFooter('../../pages/index/index.html');
}

setTimeout(main, 0);

export { services, data, createLineInput };