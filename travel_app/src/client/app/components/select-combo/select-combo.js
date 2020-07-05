// const selected = document.querySelector(".select-combo__selected");
// const optionsContainer = document.querySelector(".select-combo__options-container");
// const searchBox = document.querySelector(".select-combo__search-box input");

// const optionsList = document.querySelectorAll(".select-combo__option");

// selected.addEventListener("click", () => {
//     optionsContainer.classList.toggle("select-combo__options-container--active");

//     searchBox.value = "";
//     filterList("");

//     if (optionsContainer.classList.contains("select-combo__options-container--active")) {
//         searchBox.focus();
//     }
// });

// optionsList.forEach(o => {
//     o.addEventListener("click", () => {
//         selected.innerHTML = o.querySelector("label").innerHTML;
//         optionsContainer.classList.remove("select-combo__options-container--active");
//     });
// });

// searchBox.addEventListener("keyup", function(e) {
//     filterList(e.target.value);
// });

// const filterList = searchTerm => {
//     searchTerm = searchTerm.toLowerCase();
//     optionsList.forEach(option => {
//         let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
//         if (label.indexOf(searchTerm) != -1) {
//             option.style.display = "block";
//         } else {
//             option.style.display = "none";
//         }
//     });
// };


//###############################################################################################################


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
    optionList = optionsContainer.querySelectorAll(`${selectCombo} .select-combo__option`);
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

buildSelectCombo('#country-search');

buildSelectCombo('#location-search');

// combos.forEach((combo, index) => {
//     combo.addEventListener('click', () => {
//         comboClickCallback(index);
//     });
//     optionList = optionsContainers[index].querySelectorAll(".select-combo__option");
//     optionList.forEach((option) => {
//         option.addEventListener("click", () => {
//             console.log(index);
//             combo.querySelector("#span-1").textContent = option.querySelector("label").textContent;
//             optionsContainers[index].classList.remove("select-combo__options-container--active");
//         });
//     });
//     searchBoxes[index].addEventListener("keyup", (e) => {
//         filterList(index, e.target.value);
//     });
// });