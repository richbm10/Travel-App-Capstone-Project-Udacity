function decoratorDays(footer) {
    let days = 0;
    Client.data.locations.forEach(location => {
        days += date2.getDate(location.toDate) - date1.getDate(location.fromDate);
    });
    footer.querySelectorAll('span')[0].innerHTML = `${days} <span class="tag">days</span>`;
}

function decoratorAnchor(footer) {
    footer.querySelector('a').addEventListener('click', () => {
        Client.services.createTrip(Client.user.id, Client.data).then(() => {
            window.location.href = referencePath;
        }).catch(err => {
            console.log('ERROR', err);
            alert(err);
        });
    });
}

function setFooter(referencePath) {
    const footer = document.querySelector('footer');
    switch (referencePath) {
        case /location-calendar/.test(referencePath):
            decoratorDays(footer);
            break;
        case /trip/.test(referencePath):
            decoratorDays(footer);
            footer.querySelectorAll('span')[1].innerHTML = `${Client.data.locations.length} <span class="tag">locations</span>`;
            decoratorAnchor(footer);
            break;
        default:
            break;
    }
}

export { setFooter };