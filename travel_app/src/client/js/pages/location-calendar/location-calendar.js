import '../../../styles/pages/location-calendar.scss';
import { setCalendarMonths } from '../../components/calendar';
import { setFooter, setFooterDays } from '../../components/footer';

const data = JSON.parse(window.localStorage.getItem('data'));

function main() {
    setCalendarMonths(document.querySelector('#calendar__months'), 4);
    setFooter(document.querySelector('footer'), '../../pages/trip/trip.html');
}

setTimeout(main, 0);

export { setCalendarMonths, data, setFooterDays };