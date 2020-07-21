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

function createLocationObject() {
    const object = document.createElement('object');
    object.classList.add('location');
    object.setAttribute('type', 'image/svg+xml');
    object.data = locationIcon;
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
    option.classList.add(['row-container', 'select-combo__option']);
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
            Client.services.getAddressLocations().then(locations => {
                locations.forEach(location => {
                    const option = createOption(optionsContainer, selected);
                    const locationDisplayText = `${location.city},${location.state}${ location.county !== '' ? (' ' + location.county) : ''}`;
                    option.appendChild(createLocationObject());
                    option.appendChild(createInputLabel(locationDisplayText));
                    optionsContainer.appendChild(option);
                });
            }).catch(err => {
                console.log('ERROR', err);
                alert(err);
            });
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