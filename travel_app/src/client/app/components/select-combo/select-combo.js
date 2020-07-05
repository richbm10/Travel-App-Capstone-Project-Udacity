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

const combos = document.querySelectorAll(".select-combo__selected");
const optionsContainers = document.querySelectorAll(".select-combo__options-container");
const searchBoxes = document.querySelectorAll(".select-combo__search-box input");

function filterList(index, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    optionsContainers[index].querySelectorAll(".select-combo__option").forEach(option => {
        let label = option.querySelector('label').textContent.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
}

function comboClickCallback(index) {
    optionsContainers[index].classList.toggle("select-combo__options-container--active");

    searchBoxes[index].value = "";
    filterList(index, "");

    if (optionsContainer[index].classList.contains("select-combo__options-container--active")) {
        searchBox.focus();
    }
};

let i = 0;
combos.forEach((combo) => {
    combo.addEventListener('click', () => {
        comboClickCallback(i);
    });
    optionList = optionsContainers[i].querySelectorAll(".select-combo__option");
    optionList.forEach((option) => {
        option.addEventListener("click", () => {
            combo.textContent = option.querySelector("label").textContent;
            optionsContainer[i].classList.remove("select-combo__options-container--active");
        });
    });
    searchBoxes[i].addEventListener("keyup", (e) => {
        filterList(index, e.target.value);
    });
    i++;
});