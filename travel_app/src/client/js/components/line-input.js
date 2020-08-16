import pen from '../../assets/icons/edit-24px.svg';

function createCheckBox(input) {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.addEventListener('click', () => {
        if (input.value !== '') input.parentElement.classList.toggle('line-input--inactive');
    });
    return checkBox;
}

function createInput(text) {
    const input = document.createElement('input');
    input.classList.add('text-C');
    input.setAttribute('type', 'text');
    input.placeholder = 'List element';
    input.value = text;
    return input;
}

function createObject() {
    const object = document.createElement('object');
    object.classList.add('pen');
    object.setAttribute('type', 'image/svg+xml');
    object.data = pen;
    return object;
}

function createLineInput(text) {
    const lineInput = document.createElement('div');
    lineInput.classList.add('line-input');
    const input = createInput(text);
    const checkBox = createCheckBox(input);
    const object = createObject();
    lineInput.appendChild(checkBox);
    lineInput.appendChild(input);
    lineInput.appendChild(object);
    return lineInput;
}

export { createLineInput }