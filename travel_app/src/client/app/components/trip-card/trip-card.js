import moreHorizontal from '../../../assets/icons/more_horiz-24px.svg';

function createActionsButton() {
    const actions = document.createElement('object');
    actions.setAttribute('type', 'image/svg+xml');
    actions.data = moreHorizontal;
    actions.classList.add('actions');
    return actions;
}

function createContent(trip) {
    const content = document.createElement('div');
    content.classList.add('content');
    const p = document.createElement('p');
    p.classList.add('text-C');
    p.insertAdjacentHTML('afterbegin', setContent(trip));
}

function setTripCard(tripCard, trip) {
    tripCard.appendChild(createActionsButton());
    tripCard.appendChild(Client.createHeroSlideLocation(trip)); //TODO create it as a document fragment
    tripCard.appendChild(createContent(trip));
    const date = document.createElement('span');
    date.classList.add('text-D');
    date.textContent = trip.fromDate;
    tripCard.appendChild(date);
}

function createTripCards() {
    if (Client.user.hasOwnProperty('trips')) {
        const container = document.querySelector('#trip-cards-container');
        Client.user.trips.forEach(trip => {
            const tripCard = document.createElement('div');
            setTripCard(tripCard, trip);
            container.appendChild(tripCard);
        });
    } else {
        console.log('User property trips not found.');
    }
}

export { createTripCards };