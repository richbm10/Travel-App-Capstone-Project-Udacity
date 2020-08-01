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

function setTripName() {
    const tripName = document.querySelector('#trip-name-form .line-input input[type=text]');
    tripName.value = data.trip.name;
}

function setTripNotes() {
    const tripNotes = document.querySelector('#notes textarea');
    tripNotes.value = data.trip.notes;
}

function main() {
    if (data.trip.name !== '') setTripName();

    if (data.trip.notes !== '') setTripNotes();

    setCheckList(document.querySelector('#check-list'));

    if (data.trip.locations.length !== 0) setLocationCards(document.querySelector('#locations'));

    document.querySelector('#add-button-a').addEventListener('click', () => {
        data.trip.name = document.querySelector('#trip-name-form').tripName.value;
        data.trip.notes = document.querySelector('#notes').notes.value;
        data.trip.checkList = [];
        document.querySelectorAll('#check-list-section .line-input input[type=text]').forEach(input => {
            if ((!input.parentElement.classList.contains('line-input--inactive')) && input.value !== '') data.trip.checkList.push(input.value);
        });
        window.localStorage.setItem('data', JSON.stringify(data));
        window.location.href = '../../pages/location/location.html';
    });

    setFooter(document.querySelector('footer'), '../../pages/index/index.html');
}

setTimeout(main, 0);

export { services, data, createLineInput };