const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
let daysIndex = 0;
let fromDayIndex = null;
let toDayIndex = null;
let resetSelectDays = false;

function numberOfId(string) {
    return parseInt(string.substring(string.indexOf('-') + 1, string.length));
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function selectDays() {
    let day = null;
    for (let i = 0; i < fromDayIndex; i++) {
        day = document.querySelector(`#day-${i}`);
        if (day.classList.contains('calendar__day-selected')) day.classList.remove('calendar__day-selected');
    }
    for (let i = fromDayIndex; i <= toDayIndex; i++) {
        day = document.querySelector(`#day-${i}`);
        if (!day.classList.contains('calendar__day-selected')) day.classList.add('calendar__day-selected');
    }
    for (let i = toDayIndex + 1; i < daysIndex; i++) {
        day = document.querySelector(`#day-${i}`);
        if (day.classList.contains('calendar__day-selected')) day.classList.remove('calendar__day-selected');
    }
}

function dayClicked(daySpan, date) {
    if (!daySpan.classList.contains('calendar__day-reserved')) {
        const dayIndex = numberOfId(daySpan.id);
        if (fromDayIndex === null) {
            Client.data.location.fromDate = date;
            fromDayIndex = dayIndex;
        } else if (fromDayIndex < dayIndex && !resetSelectDays) {
            Client.data.location.toDate = date;
            toDayIndex = dayIndex;
            resetSelectDays = true;
        } else if ((fromDayIndex >= dayIndex) || resetSelectDays) {
            Client.data.location.toDate = date;
            toDayIndex = dayIndex;
            Client.data.location.fromDate = date;
            fromDayIndex = dayIndex;
            resetSelectDays = false;
        }
        if (toDayIndex !== null) {
            selectDays();
        } else if (!daySpan.classList.contains('calendar__day-selected')) daySpan.classList.add('calendar__day-selected');
    }
}

function createCalendarDays(month, currentYear) {
    const calendarDays = document.createElement('div');
    calendarDays.classList.add('calendar__days');
    const currentMonth = (new Date()).getMonth();
    const currentDay = (new Date()).getDate();
    const days = daysInMonth(month, currentYear);
    for (let day = 0; day < days; day++) {
        const daySpan = document.createElement('span');
        daySpan.id = `day-${daysIndex++}`;
        daySpan.addEventListener('click', () => { dayClicked(daySpan, `${month+1}/${day+1}/${currentYear}`) });
        if ((currentMonth === month) && (day < currentDay)) daySpan.classList.add('calendar__day-reserved');
        daySpan.textContent = day + 1;
        calendarDays.appendChild(daySpan);
    }
    return calendarDays;
}

function createCalendarMonth(month) {
    const currentYear = new Date().getFullYear();
    const container = new DocumentFragment();
    const header = document.createElement('h3');
    header.classList.add('text-B');
    header.textContent = `${months[month]} ${currentYear}`;
    const calendarDays = createCalendarDays(month, currentYear);
    container.appendChild(header);
    container.appendChild(calendarDays);
    return container;
}

function setCalendarMonths(container, months) {
    let month = (new Date()).getMonth();
    for (let i = 0; i < months; i++) {
        container.appendChild(createCalendarMonth(month));
        month += 1;
    }
    return container;
}

export { setCalendarMonths }