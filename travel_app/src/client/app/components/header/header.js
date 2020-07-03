function setButton(pathReference, text) {
    let anchor = document.createElement('a');

    anchor.setAttribute('href', pathReference);
    document.querySelector('header').appendChild(anchor);
}

function buildComponent(pagePath) {
    switch (pagePath) {
        case /location/.test(pagePath):
            setButton('', 'Next');
            break;
        case /location-detail/.test(pagePat):
            setButton('', 'Next');
            break;
        case /trip-location/.test(pagePath):
            setButton('', 'Dates');
            break;
        default:
            break;
    }
}

export { buildComponent };