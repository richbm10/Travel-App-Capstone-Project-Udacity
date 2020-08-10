import locationCityIcon from '../../assets/icons/location_city-24px.svg';
import peopleAltIcon from '../../assets/icons/people_alt-24px.svg';
import paymentsIcon from '../../assets/icons/payments-24px.svg';

function formatNumber(x) { //Taken from https://gist.github.com/cfjedimaster/3060121#file-gistfile1-js
    if (isNaN(x)) return x;

    if (x < 9999) {
        return x;
    }

    if (x < 1000000) {
        return Math.round(x / 1000) + "K";
    }
    if (x < 10000000) {
        return (x / 1000000).toFixed(2) + "M";
    }

    if (x < 1000000000) {
        return Math.round((x / 1000000)) + "M";
    }

    if (x < 1000000000000) {
        return Math.round((x / 1000000000)) + "B";
    }

    return "1T+";
}

function createContentRow(icon, label) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    const obj = document.createElement('object');
    obj.classList.add('country-capital__icon');
    obj.data = icon;
    obj.setAttribute('type', 'image/svg+xml');
    const span = document.createElement('span');
    span.textContent = label;
    rowContainer.appendChild(obj);
    rowContainer.appendChild(span);
    return rowContainer;
}

function createCountryCapitalContent(countryDetails) {
    const columnContainer = document.createElement('div');
    columnContainer.classList.add('column-container-A', 'text-B');
    const country = document.createElement('span');
    country.classList.add('text-A');
    country.id = 'country-capital__country';
    country.textContent = countryDetails.name;
    const capital = createContentRow(locationCityIcon, countryDetails.capital);
    const population = createContentRow(peopleAltIcon, formatNumber(countryDetails.population));
    const currency = createContentRow(paymentsIcon, `${countryDetails.currencies[0].code} ${countryDetails.currencies[0].symbol}`);
    columnContainer.appendChild(country);
    columnContainer.appendChild(capital);
    columnContainer.appendChild(population);
    columnContainer.appendChild(currency);
    return columnContainer;
}

function createCountryCapital(countryDetails) {
    const countryCapital = document.createElement('div');
    Client.services.getLocationImage(countryDetails.capital).then(capitalImage => {
        countryCapital.classList.add('country-capital');
        const image = document.createElement('img');
        image.alt = countryDetails.capital;
        image.src = capitalImage.webformatURL;
        const content = createCountryCapitalContent(countryDetails);
        countryCapital.appendChild(image);
        countryCapital.appendChild(content);
    }).catch(err => {
        console.log('ERROR', err);
        alert(err);
    });
    return countryCapital;
}

export { createCountryCapital };