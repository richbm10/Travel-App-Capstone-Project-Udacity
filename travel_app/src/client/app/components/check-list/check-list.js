function setCheckList() {
    const checkList = document.querySelector('#check-list');
    Client.data.trip.checkList.forEach(text => {
        const lineInput = Client.createLineInput(text);
        checkList.insertAdjacentElement('afterbegin', lineInput);
    });
}

const addListElementBtn = document.querySelector('#add-element');
addListElementBtn.addEventListener('click', () => {
    const lineInput = Client.createLineInput('');
    addListElementBtn.insertAdjacentElement('beforebegin', lineInput);
});

export { setCheckList };