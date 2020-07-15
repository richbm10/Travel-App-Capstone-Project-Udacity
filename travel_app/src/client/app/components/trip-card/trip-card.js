import moreHorizontal from '../../../assets/icons/more_horiz-24px.svg';

const MAX_NOTES_CHARS = 78;

function createActionsButton() {
    const actions = document.createElement('object');
    actions.setAttribute('type', 'image/svg+xml');
    actions.data = moreHorizontal;
    actions.classList.add('actions');
    return actions;
}

function setContent(trip) {
    const text = `<span>${trip.name}</span> </br > `;
    const notesLength = trip.notes.length;
    if (notesLength > MAX_NOTES_CHARS) {
        text += `${trip.notes.substring(0, notesLength)} <span class="more">...more</span>`;
    } else {
        text += trip.notes;
    }
    return text;
}

function createContent(trip) {
    const content = document.createElement('div');
    content.classList.add('content');
    const p = document.createElement('p');
    p.classList.add('text-C');
    p.insertAdjacentHTML('afterbegin', setContent(trip));
    return content;
}

async function setTripCard(tripCard, trip) {
    tripCard.appendChild(createActionsButton());
    tripCard.appendChild(await Client.createHeroSlideLocation(trip.locations)); //TODO create it as a document fragment
    tripCard.appendChild(createContent(trip));
    const date = document.createElement('span');
    date.classList.add('text-D');
    date.textContent = trip.fromDate;
    tripCard.appendChild(date);
}

function createTripCards() {
    const container = document.querySelector('#trip-cards-container');
    Client.user.trips.forEach(trip => {
        const tripCard = document.createElement('div');
        tripCard.classList.add('trip-card');
        setTripCard(tripCard, trip);
        container.appendChild(tripCard);
    });
}

export { createTripCards };