const MAX_SLIDE_ELEMENTS = 3;

function createSlideLocationLabel(location) {
    const createSlideLocationLabel = document.createElement('div');
    createSlideLocationLabel.classList.add('row-container');
    const span = document.createElement('span');
    span.classList.add('text-C');
    span.textContent = location.location;
    const obj = document.createElement('object');
    obj.setAttribute('type', 'image/svg+xml');
    const flag = `https://restcountries.eu/data/${location.country}.svg`;
    obj.style.backgroundImage = "url(\'" + flag + "\')";
    obj.classList.add('avatar');
    createSlideLocationLabel.appendChild(span);
    createSlideLocationLabel.appendChild(obj);
    return createSlideLocationLabel;
}

function addSlideElementContent(slideElement, location) {
    const currentPath = window.location.pathname;
    switch (true) {
        case /location-detail/.test(currentPath):
            break;
        case /location/.test(currentPath):
            break;
        default:
            slideElement.appendChild(createSlideLocationLabel(location));
            break;
    }
}

function createSlideElement(location, image) {
    const slideElement = document.createElement('div');
    slideElement.classList.add('__slide-element');
    const img = document.createElement('img');
    img.setAttribute('alt', location.location);
    img.setAttribute('src', image.webformatURL);
    slideElement.appendChild(img);
    addSlideElementContent(slideElement, location);
    return slideElement;
}

async function createSlideElements(locations) {
    const locationsImages = await Client.services.getImages(locations);
    const heroSlideLocation = document.createElement('div');
    let progressCircles = 0;
    heroSlideLocation.classList.add('hero-slide-location');
    for (let i = 0; i < MAX_SLIDE_ELEMENTS; i++) {
        if (i === locations.length) break;
        for (let image of locationsImages[i]) {
            if (image === null) break;
            progressCircles += 1;
            heroSlideLocation.appendChild(createSlideElement(locations[i], image));
        }
    }
    return [heroSlideLocation, progressCircles];
}

function createProgressCircles(amount = -1) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    let progressCircle;
    for (let i = 0; i < MAX_SLIDE_ELEMENTS; i++) {
        if (i === amount) break;
        progressCircle = document.createElement('div');
        progressCircle.classList.add('progress-circle');
        if (i === 0) progressCircle.classList.add('active');
        rowContainer.appendChild(progressCircle);
    }
    return rowContainer;
}

async function createHeroSlideLocation(locations) {
    const documentFragment = new DocumentFragment();
    const [heroSlide, amountProgressCircles] = await createSlideElements(locations);
    documentFragment.appendChild(heroSlide);
    documentFragment.appendChild(createProgressCircles(amountProgressCircles));
    return documentFragment;
}

export { createHeroSlideLocation };