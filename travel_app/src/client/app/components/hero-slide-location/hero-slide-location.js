const MAX_SLIDE_ELEMENTS = 3;

function createSlideLocationLabel(location) {
    const createSlideLocationLabel = document.createElement('div');
    createSlideLocationLabel.classList.add('row-container');
    const span = document.createElement('span');
    span.classList.add('text-C');
    span.textContent = location.location;
    const obj = document.createElement('object');
    obj.setAttribute('type', 'image/svg+xml');
    obj.setAttribute('data', `https://restcountries.eu/data/${location.country}.svg`);
    obj.classList.add('avatar');
    createSlideLocationLabel.appendChild(span);
    createSlideLocationLabel.appendChild(obj);
    return createSlideLocationLabel;
}

function createSlideElement(location, image) {
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
    try {
        const locationsImages = await Client.services.getTripImages(locations);
        const heroSlideLocation = document.createElement('div');
        heroSlideLocation.classList.add('hero-slide-location');
        for (let i = 0; i < MAX_SLIDE_ELEMENTS; i++) {
            console.log(i, locations.length);
            if (i === locations.lenght) break;
            heroSlideLocation.appendChild(createSlideElement(locations[i], locationsImages[i]));
        }
        return heroSlideLocation;
    } catch (err) {
        console.log('ERROR', err);
        alert(err);
    }
}

function createProgressCircles(amount) {
    const rowContainer = document.createElement('div');
    rowContainer.classList('row-container');
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
    documentFragment.appendChild(createProgressCircles(locations.lenght));
    return documentFragment;
}

export { createHeroSlideLocation };