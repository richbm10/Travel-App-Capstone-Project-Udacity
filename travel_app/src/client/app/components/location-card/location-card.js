async function createImage(location) {
    const image = await Client.services.getLocationImage(location);
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = location;
    return img;
}

function createTopBar(location) {
    const topBar = document.createElement('div');
    topBar.classList.add('row-container');
    topBar.classList.add('__top-bar');
    const locationLabel = document.createElement('div');
    locationLabel.classList.add('row-container');
    const span = document.createElement('span');
    span.classList.add('text-C');
    span.textContent = location.location;
    const obj = document.createElement('object');
    obj.setAttribute('type', 'image/svg+xml');
    const flag = `https://restcountries.eu/data/${location.country}.svg`;
    obj.style.backgroundImage = "url(\'" + flag + "\')";
    obj.classList.add('avatar');
    locationLabel.appendChild(span);
    locationLabel.appendChild(obj);
    topBar.appendChild(locationLabel);
    topBar.insertAdjacentHTML('beforeend', '<svg class="actions" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><style type="text/css">  .st0{fill:none;}.st2{fill:#FFFFFF;} </style><path class="st0" d="M0 0h24v24H0V0z"/><path class="st2" d="M12 8c1.1 0 2-0.9 2-2s-0.9-2-2-2 -2 0.9-2 2S10.9 8 12 8zM12 10c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2S13.1 10 12 10zM12 16c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2S13.1 16 12 16z"/></svg>');
    return topBar;
}

function createSchedule(fromDate, toDate) {
    const schedule = document.createElement('div');
    schedule.classList.add('row-container');
    schedule.classList.add('__schedule');
    schedule.classList.add('text-C');
    const days = document.createElement('span');
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);
    days.textContent = `${date2.getDate() - date1.getDate()} days`;
    const startingDate = document.createElement('span');
    startingDate.textContent = fromDate;
    schedule.appendChild(days);
    schedule.appendChild(startingDate);
    return schedule;
}

async function createLocationCard(location) {
    const locationCard = document.createElement('div');
    locationCard.classList.add('location-card');
    const image = await createImage(location.location);
    const topBar = createTopBar(location);
    const schedule = createSchedule(location.fromDate, location.toDate);
    locationCard.appendChild(image);
    locationCard.appendChild(topBar);
    locationCard.appendChild(schedule);
    return locationCard;
}

function setLocationCards() {
    const container = document.querySelector('#locations');
    Client.data.trip.locations.forEach(location => {
        createLocationCard(location).then(locationCard => {
            container.appendChild(locationCard);
        }).catch(err => {
            console.log('ERROR', err);
            alert(err);
        });
    });
}

export { setLocationCards }