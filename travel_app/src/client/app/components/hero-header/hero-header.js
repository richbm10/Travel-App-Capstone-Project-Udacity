function createHeroHeaderLabel() {
    const heroHeaderLabel = document.createElement('div');
    heroHeaderLabel.id = 'hero-header__content';
    heroHeaderLabel.classList.add('row-container');
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    const columnContainer = document.createElement('div');
    columnContainer.classList.add('column-container-B');
    const location = document.createElement('span');
    location.classList.add('text-A');
    location.textContent = `${ Client.data.location.city !== '' ? (Client.data.location.city + ', ') : ''}${Client.data.location.state}`;
    columnContainer.appendChild(location);
    heroHeaderLabel.appendChild(avatar);
    heroHeaderLabel.appendChild(columnContainer);
    return heroHeaderLabel;
}

function createHeroContent(heroSlide) {
    const documentFragment = new DocumentFragment();
    documentFragment.appendChild(heroSlide);
    documentFragment.appendChild(createHeroHeaderLabel());
    return documentFragment;
}

export { createHeroContent };