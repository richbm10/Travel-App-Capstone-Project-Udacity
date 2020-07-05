const selected = document.querySelector(".select-combo__selected");
const optionsContainer = document.querySelector(".select-combo__options-container");
const searchBox = document.querySelector(".select-combo__search-box input");

const optionsList = document.querySelectorAll(".select-combo__option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("select-combo__options-container--active");

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("select-combo__options-container--active")) {
        searchBox.focus();
    }
});

optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("select-combo__options-container--active");
    });
});

searchBox.addEventListener("keyup", function(e) {
    filterList(e.target.value);
});

const filterList = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach(option => {
        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
};