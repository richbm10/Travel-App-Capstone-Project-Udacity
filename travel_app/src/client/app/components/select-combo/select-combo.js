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

function createObject(flag) {
    const object = document.createElement('object');
    object.classList.add('avatar');
    object.setAttribute('type', 'image/svg+xml');
    object.style.backgroundImage = "url(\'" + flag + "\')";
    return object;
}

function createInputLabel(countryName) {
    const documentFragment = new DocumentFragment();
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    const countryTagName = countryName.replace(/\s/g, '');
    input.id = countryTagName;
    const label = document.createElement('label');
    label.htmlFor = countryTagName;
    label.textContent = countryName;
    documentFragment.appendChild(input);
    documentFragment.appendChild(label);
    return documentFragment;
}

function createOption(country, optionsContainer, selected) {
    const option = document.createElement('div');
    option.classList.add(['row-container', 'select-combo__option']);
    option.appendChild(createObject(country.flag));
    option.appendChild(createInputLabel(country.name));
    option.addEventListener("click", () => {
        selected.querySelector('span').textContent = option.querySelector('label').textContent;
        optionsContainer.classList.remove("select-combo__options-container--active");
    });
    return option;
}

function setLocationOptions() {}

function setSelectCombo(selectCombo) {
    const selected = document.querySelector(`${selectCombo} .select-combo__selected`);
    const optionsContainer = document.querySelector(`${selectCombo} .select-combo__options-container`);
    const searchBox = document.querySelector(`${selectCombo} .select-combo__search-box input`);

    selected.addEventListener('click', () => {
        comboClickCallback(optionsContainer, searchBox);
    });

    if (selectCombo === '#country-search') {
        Client.services.countries.forEach(country => {
            optionsContainer.appendChild(createOption(country, optionsContainer, selected));
        });
        searchBox.addEventListener("keyup", (e) => {
            filterList(optionsContainer, e.target.value);
        });
    } else if (selectCombo === '#location-search') {
        setLocationOptions(optionsContainer, selected);
    }
}

export { setSelectCombo };