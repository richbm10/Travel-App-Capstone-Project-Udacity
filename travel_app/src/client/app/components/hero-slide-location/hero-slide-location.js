const MAX_SLIDE_ELEMENTS = 3;

function createSlideLocationLabel(country) {
    const createSlideLocationLabel = document.createElement('div');
    rowContainer.classList.add('row-container');
    const span = document.createElement('span');
    span.classList.add('text-C');
    const object = document.createElement('object');
    object.setAttribute('type', 'image/svg+xml');
    object.setAttribute('data', `https://restcountries.eu/data/${country}.svg`);
    object.classList.add('avatar');
    return createSlideLocationLabel;
}

function createSlideElement(location, imageUrl) {
    const slideElement = document.createElement('div');
    slideElement.classList.add('__slide-element');
    const image = document.createElement('img');
    image.setAttribute('alt', location.location);
    //image.setAttribute('src'); check response
    slideElement.appendChild(image);
    slideElement.appendChild(createSlideLocationLabel(location.country));
    return slideElement;
}

async function createSlideElements(locations) {
    try {
        const locationsImages = await Client.services.getTripImages(locations);
        const heroSlideLocation = document.createElement('div');
        heroSlideLocation.classList.add('hero-slide-location');
        for (let i = 0; i < MAX_SLIDE_ELEMENTS; i++) {
            if (i === locations.lenght) break;
            heroSlideLocation.appendChild(createSlideElement(locations[i], locationsImages[i]));
        }
        return heroSlideLocation;
    } catch (err) {
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