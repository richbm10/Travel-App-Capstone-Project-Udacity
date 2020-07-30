const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
let daysIndex = 0;
let fromDayIndex = 0;
let toDayIndex = 0;

function numberOfId(string) {
    return parseInt(string.substring(string.indexOf('-') + 1, string.length));
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function selectDays(exclude) {
    console.log('selectDays');
    let dayIndex = fromDayIndex;
    while (dayIndex <= toDayIndex) {
        if (dayIndex !== exclude) document.querySelector(`#day-${dayIndex}`).classList.toggle('calendar__day-selected');
        dayIndex++;
    }
}

function dayClicked(daySpan, date) {
    if (!daySpan.classList.contains('calendar__day-reserved')) {
        daySpan.classList.toggle('calendar__day-selected');
        if ((Client.data.location.fromDate === '' && Client.data.location.toDate === '') ||
            ((new Date(Client.data.location.toDate)).getTime() > (new Date(date)).getTime())) {
            Client.data.location.fromDate = date;
            fromDayIndex = numberOfId(daySpan.id);
        }
        if ((new Date(Client.data.location.fromDate)).getTime() < (new Date(date)).getTime()) {
            Client.data.location.toDate = date;
            toDayIndex = numberOfId(daySpan.id);
        }
        selectDays(numberOfId(daySpan.id));
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