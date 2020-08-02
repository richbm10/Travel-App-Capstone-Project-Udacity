/*
Singleton Pattern Design for requesting images on each micro-service endpoint.
Services:
    - getImages: retrieves images from the PixabayAPI based on a given address. The images are sorted from the most to the least viewed image.
*/

const axios = require('axios');

const ImageServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    apis: {
                        pixabayAPI: 'https://pixabay.com/api/'
                    },
                    queryLocationImages: function(address) {
                        return `?key=${process.env.PIXABAY_KEY}&q=${address}&image_type=photo`;
                    },
                    getImages: async function(query) {
                        const response = await axios.get(this.apis.pixabayAPI + query);
                        const images = response.data.hits;
                        images.sort((imgA, imgB) => { return imgB.views - imgA.views });
                        const responseImages = images.map((image) => {
                            const { webformatURL, webformatWidth, webformatHeight, views } = image;
                            return { webformatURL, webformatWidth, webformatHeight, views };
                        });
                        return { responseImages };
                    }
                };
            }
            return instance;
        }
    };
})();

exports.ImageServices = ImageServices;