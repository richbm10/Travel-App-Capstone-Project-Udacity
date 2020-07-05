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
};

function buildSelectCombo(selectCombo) {
    const selected = document.querySelector(`${selectCombo} > .select-combo__selected`);
    const optionsContainer = document.querySelector(`${selectCombo} > .select-combo__options-container`);
    const searchBox = document.querySelector(`${selectCombo} > .select-combo__search-box input`);

    selected.addEventListener('click', () => {
        comboClickCallback(optionsContainer, searchBox);
    });
    const optionList = optionsContainer.querySelectorAll(`${selectCombo} .select-combo__option`);
    optionList.forEach((option) => {
        option.addEventListener("click", () => {
            selected.querySelector(`${selectCombo} span`).textContent = option.querySelector(`${selectCombo} label`).textContent;
            optionsContainer.classList.remove("select-combo__options-container--active");
        });
    });
    searchBox.addEventListener("keyup", (e) => {
        filterList(optionsContainer, e.target.value);
    });
}

export { buildSelectCombo };