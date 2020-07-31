import './location-calendar.scss';
import { setCalendarMonths } from '../../components/calendar/calendar';

const data = JSON.parse(window.localStorage.getItem('data'));

function main() {
    const calendarMonths = document.querySelector('#calendar__months');
    setCalendarMonths(calendarMonths, 4)
}

setTimeout(main, 0);

export { setCalendarMonths, data };