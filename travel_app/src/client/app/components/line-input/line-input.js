import pen from '../../../assets/icons/edit-24px.svg';

function createLineInput(text) {
    const lineInput = document.createElement('div');
    lineInput.classList.add('line-input');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    const input = document.createElement('input');
    input.classList.add('text-C');
    input.setAttribute('type', 'text');
    input.placeholder = 'List element';
    input.value = text;
    const object = document.createElement('object');
    object.classList.add('pen');
    object.setAttribute('type', 'image/svg+xml');
    object.data = pen;
    return lineInput;
}

export { createLineInput }