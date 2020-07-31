const currentPath = window.location.pathname;

function decoratorAllDays(footer) {
    let days = 0;
    Client.data.trip.locations.forEach(location => {
        const fromDate = new Date(location.fromDate);
        const toDate = new Date(location.toDate);
        days += Math.ceil(Math.abs(toDate - fromDate) / (1000 * 60 * 60 * 24));
    });
    footer.querySelectorAll('footer > span')[0].innerHTML = `${days} <span class="tag">days</span>`;
}

function decoratorDays(footer) {
    const fromDate = new Date(Client.data.location.fromDate);
    const toDate = new Date(Client.data.location.toDate);
    const days = Math.ceil(Math.abs(toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
    footer.querySelectorAll('footer > span')[0].innerHTML = `${days} <span class="tag">days</span>`;
}

function registerTrip(referencePath) {
    Client.data.trip.setName(document.querySelector('#trip-name-form').tripName.value);
    Client.data.trip.setNotes(document.querySelector('#notes').notes.value);
    Client.data.trip.setCheckList((checkList) => {
        document.querySelectorAll('.line-input input[type=text]').forEach(input => {
            if ((!input.parentElement.classList.contains('line-input--inactive')) && input.value !== '') checkList.push(input.value);
        });
    });
    Client.services.createTrip(Client.data.user.id, Client.data.trip).then(() => {
        window.location.href = referencePath;
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
}

function decoratorTripAnchor(footer, referencePath) {
    footer.querySelector('a').addEventListener('click', () => {
        if (Client.data.trip.locations === 0) {
            alert('You must register locations to add the trip.');
        } else {
            registerTrip(referencePath);
        }
    });
}

function decoratorLocationAnchor(footer, referencePath) {
    footer.querySelector('a').addEventListener('click', () => {
        if (Client.data.location.fromDate === '' || Client.data.location.toDate === '') {
            alert('You must select the days in which you will be in the location.');
        } else {
            Client.data.trip.locations.push(Client.data.location);
            window.localStorage.setItem('data', JSON.stringify(Client.data));
            window.location.href = referencePath;
        }
    });
}

function setFooterDays(footer) {
    if (/location-calendar/.test(currentPath)) {
        decoratorDays(footer);
    }
}

function setFooter(footer, referencePath) {
    if (/location-calendar/.test(currentPath)) {
        decoratorLocationAnchor(footer, referencePath);
    } else if (/trip/.test(currentPath)) {
        decoratorAllDays(footer);
        footer.querySelectorAll('footer > span')[1].innerHTML = `${Client.data.trip.locations.length} <span class="tag">locations</span>`;
        decoratorTripAnchor(footer, referencePath);
    }
}

export { setFooter, setFooterDays };