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
                    baseUserEndpoint: 'http://localhost:8030/user/',
                    baseLocationImageEndpoint: 'http://localhost:8030/image/location/',
                    getUser: async function(username) {
                        const response = await fetch(this.baseUserEndpoint + username);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    },
                    getLocationImage: async function(location) {
                        const query = `${location}/1`;
                        const response = await fetch(this.baseLocationImageEndpoint + query);
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
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

describe("[index-services-test]", () => {

    let expectedOutput = {
        id: 0,
        name: 'Ricardo',
        lastName: 'Bonilla Morales',
        username: 'richi_bonilla10',
        idCounter: 1,
        trips: [{
            id: 0,
            name: 'USA Trip',
            checkList: ['Pack my pills', 'Exchange my cash into dollars in the airport'],
            notes: 'Hotel: Marriott\nReservation: 1123412',
            locations: [{
                city: 'Washington',
                county: 'District of Columbia',
                state: 'DC',
                country: 'usa',
                latLng: { lat: 38.892062, lng: -77.019912 },
                fromDate: '7/7/2020',
                toDate: '7/28/2020',
                flag: "https://restcountries.eu/data/usa.svg"
            }]
        }]
    };

    servicesTestGetUser('[TEST00]', 'richi_bonilla10', expectedOutput);

});