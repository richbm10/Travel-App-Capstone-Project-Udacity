import "babel-polyfill";

const axios = require('axios');
const url = require('url');

const getUser = async function(username) {
    const { ip, port } = await getService('user_service');
    const response = await axios({
        method: 'get',
        url: `http://${ip}:${port}/user/${username}`
    });
    const resData = response.data;
    if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
    console.log(resData);
    return resData;
}

const getService = async function(servicename) {
    const response = await axios.get(`http://localhost:3000/find/${servicename}/1.0.0`);
    return response.data;
}

function servicesTestGetUser(testId, input, expectedOutput) {
    it(`${testId}-[get-user]-[should retrieve the user data]`, () => {
        expect.assertions(1);
        return getUser(input).then(user => {
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