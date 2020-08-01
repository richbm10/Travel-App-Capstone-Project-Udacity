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
    let text = `<span>${trip.name}</span> </br > `;
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
    content.appendChild(p);
    return content;
}

async function createTripCard(trip) {
    const tripCard = document.createElement('div');
    tripCard.classList.add('trip-card');
    tripCard.appendChild(createActionsButton());
    tripCard.appendChild(await Client.createHeroSlideLocation(trip.locations)); //TODO create it as a document fragment
    tripCard.appendChild(createContent(trip));
    const date = document.createElement('span');
    date.classList.add('text-D');
    date.textContent = trip.locations[0].fromDate; //the fromDate of the first location to visit
    tripCard.appendChild(date);
    tripCard.addEventListener('click', () => {
        Client.data['trip'] = trip;
        window.localStorage.setItem('data', JSON.stringify(Client.data));
        window.location.href = '../../pages/trip/trip.html?edit=' + 'true';
    });
    return tripCard;
}

function createTripCards() {
    const container = document.querySelector('#trip-cards-container');
    const promises = [];
    Client.data.user.trips.forEach(trip => {
        promises.push(createTripCard(trip));
    });
    Promise.all(promises).then(tripCards => {
        tripCards.forEach(tripCard => {
            container.appendChild(tripCard);
        });
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
}

export { createTripCards };