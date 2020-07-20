function decoratorDays(footer) {
    let days = 0;
    Client.data.trip.locations.forEach(location => {
        const fromDate = new Date(location.fromDate);
        const toDate = new Date(location.toDate);
        days += toDate.getDate() - fromDate.getDate();
    });
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

function setFooter(referencePath) {
    const footer = document.querySelector('footer');
    const currentPath = window.location.pathname;
    if (/location-calendar/.test(currentPath)) {
        decoratorDays(footer);
    } else if (/trip/.test(currentPath)) {
        decoratorDays(footer);
        footer.querySelectorAll('footer > span')[1].innerHTML = `${Client.data.trip.locations.length} <span class="tag">locations</span>`;
        decoratorTripAnchor(footer, referencePath);
    }
}

export { setFooter };