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

function createSlideElement(location, image) {
    console.log(image);
    const slideElement = document.createElement('div');
    slideElement.classList.add('__slide-element');
    const img = document.createElement('img');
    img.setAttribute('alt', location.location);
    img.setAttribute('src', image.webformatURL);
    slideElement.appendChild(img);
    slideElement.appendChild(createSlideLocationLabel(location));
    return slideElement;
}

async function createSlideElements(locations) {
    const locationsImages = await Client.services.getTripImages(locations);
    const heroSlideLocation = document.createElement('div');
    heroSlideLocation.classList.add('hero-slide-location');
    for (let i = 0; i < MAX_SLIDE_ELEMENTS; i++) {
        if (i === locations.length) break;
        heroSlideLocation.appendChild(createSlideElement(locations[i], locationsImages[i][0])); //notice that each image response is an array
    }
    return heroSlideLocation;
}

function createProgressCircles(amount) {
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
    documentFragment.appendChild(await createSlideElements(locations));
    documentFragment.appendChild(createProgressCircles(locations.length));
    return documentFragment;
}

export { createHeroSlideLocation };