import locationIcon from '../../../assets/icons/location_on-24px.svg';
let selectedCountry = '';

function filterList(optionsContainer, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    optionsContainer.querySelectorAll(".select-combo__option").forEach(option => {
        let label = option.querySelector('label').textContent.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
            option.style.display = "flex";
        } else {
            option.style.display = "none";
        }
    });
}

function comboClickCallback(optionsContainer, searchBox) {
    optionsContainer.classList.toggle("select-combo__options-container--active");

    searchBox.value = "";
    filterList(optionsContainer, "");

    if (optionsContainer.classList.contains("select-combo__options-container--active")) {
        searchBox.focus();
    }
}

function createFlagObject(flag) {
    const object = document.createElement('object');
    object.classList.add('avatar');
    object.setAttribute('type', 'image/svg+xml');
    object.style.backgroundImage = "url(\'" + flag + "\')";
    return object;
}

function createInputLabel(name) {
    const documentFragment = new DocumentFragment();
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    const countryTagName = name.replace(/\s/g, '');
    input.id = countryTagName;
    const label = document.createElement('label');
    label.htmlFor = countryTagName;
    label.textContent = name;
    documentFragment.appendChild(input);
    documentFragment.appendChild(label);
    return documentFragment;
}

function createOption(optionsContainer, selected, isCountry = false) {
    const option = document.createElement('div');
    option.classList.add('row-container', 'select-combo__option');
    option.addEventListener("click", () => {
        const selectedContent = option.querySelector('label').textContent;
        if (isCountry) selectedCountry = selectedContent;
        selected.querySelector('span').textContent = selectedContent;
        optionsContainer.classList.remove("select-combo__options-container--active");
    });
    return option;
}

function setCountryOptions(selected, optionsContainer, searchBox) {
    Client.services.countries.forEach(country => {
        const option = createOption(optionsContainer, selected, true);
        option.appendChild(createFlagObject(country.flag));
        option.appendChild(createInputLabel(country.name));
        optionsContainer.appendChild(option);
    });
    searchBox.addEventListener("keyup", (event) => {
        filterList(optionsContainer, event.target.value);
    });
}

function setLocationOptions(selected, optionsContainer, searchBox) {
    searchBox.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            Client.services.getAddressLocations(event.target.value).then(data => {
                data.responseLocations.forEach(location => {
                    const option = createOption(optionsContainer, selected);
                    const locationDisplayText = `${ location.city !== '' ? (location.city + ', ') : ''}${location.state}${ location.county !== '' ? (' ' + location.county) : '' }`;
                    option.insertAdjacentHTML('afterbegin', '<svg class="location" xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20"><style type="text/css">  .st0{fill:none;} .st1{fill:#707070;} </style><path class="st0" d="M0 0h24v24H0V0z"/><path class="st1" d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.8 7-13C19 5.1 15.9 2 12 2zM12 11.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>');
                    option.appendChild(createInputLabel(locationDisplayText));
                    optionsContainer.appendChild(option);
                });
            }).catch(err => {
                console.log('ERROR', err);
                alert(err);
            });
        } else {
            filterList(optionsContainer, event.target.value);
        }
    });
}

function setSelectCombo(selectCombo) {
    const selected = document.querySelector(`${selectCombo} .select-combo__selected`);
    const optionsContainer = document.querySelector(`${selectCombo} .select-combo__options-container`);
    const searchBox = document.querySelector(`${selectCombo} .select-combo__search-box input`);

    selected.addEventListener('click', () => {
        comboClickCallback(optionsContainer, searchBox);
    });

    if (selectCombo === '#country-search') {
        setCountryOptions(selected, optionsContainer, searchBox);
    } else if (selectCombo === '#location-search') {
        setLocationOptions(selected, optionsContainer, searchBox);
    }
}

export { setSelectCombo };