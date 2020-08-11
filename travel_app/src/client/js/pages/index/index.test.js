/*
fetch is not available in Node, which is where Jest is running your tests. Is it an experimental browser technology.
So the node_module node-fetch must be required for using fetch in node.
*/
import "babel-polyfill";
const fetch = require('node-fetch');

const IndexServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    user: {},
                    baseUserEndpoint: '/user/',
                    baseLocationImageEndpoint: '/image/location/',
                    getUser: async function(username) {
                        const response = await fetch(this.baseUserEndpoint + username);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    },
                    getLocationImage: async function(location) {
                        console.log(location);
                        const query = `${location}/1`;
                        const response = await fetch(this.baseLocationImageEndpoint + query);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        console.log(resData);
                        return resData;
                    },
                    getImages: async function(locations) {
                        const promises = [];
                        locations.forEach(location => {
                            promises.push(this.getLocationImage(`${ location.city !== '' ? (location.city + ', ') : ''}${location.state}`));
                        });
                        const results = await Promise.all(promises);
                        return results;
                    }
                };
            }
            return instance;
        }
    };
})();

const services = IndexServices.getInstance();

function servicesTestGetUser(testId, input, expectedOutput) {
    it(`${testId}-[get-user]-[should retrieve the user data]`, () => {
        expect.assertions(1);
        return services.getUser(input).then(user => {
            expect(user).toMatchObject(expectedOutput);
        }).catch(err => {
            console.log('ERROR', err);
            expect(err).toMatchObject(expectedOutput);
        });
    });
}

function servicesTestGetImages(testId, input, expectedOutput) {
    it(`${testId}-[get-images]-[should retrieve an image for each location]`, () => {
        expect.assertions(1);
        return services.getImages(input).then(locationsImages => {
            expect(locationsImages).toMatchObject(expectedOutput);
        }).catch(err => {
            console.log('ERROR', err);
            expect(err).toMatchObject(expectedOutput);
        });
    });
}

describe("[submit form]", () => {

    let expectedOutput = {};
    servicesTestGetUser('[TEST00]', 'richi_bonilla10', expectedOutput);



});