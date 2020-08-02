/*
Singleton Pattern Design for requesting user data on each micro-service endpoint. It is used as a simulation of a user database
during program execution.
Services:
    - getUser: retrieves user data based on the given username.
    - createTrip: stores a given trip to the respective user based on the given user id.
    - updateTrip: updates the user trip that has the same id as the given update trip, for the user that has the given user id.
    - deleteTrip (NOT IMPLEMENTED IN THE FRONT END): deletes the user trip that has the same id as the given trip, for the user
    that has the given user id.
*/

const UserServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    users: [{
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
                    }],
                    getUser: function(username) {
                        const data = this.users.find((user) => {
                            return user.username === username;
                        });
                        if (data === null) {
                            throw new Error('The username is not registered.');
                        }
                        return data;
                    },
                    createTrip: function(userId, newTrip) {
                        const { name, checkList, notes, locations } = newTrip;
                        const trip = { name, checkList, notes, locations };
                        for (let user of this.users) {
                            if (user.id == userId) {
                                user.trips.push({ id: user.idCounter++, ...trip });
                                return { success: { status: 200, message: 'The trip was created.' } };
                            }
                        }
                        throw new Error('The user is not registered.');
                    },
                    updateTrip: function(userId, pTrip) {
                        const { id, name, checkList, notes, locations } = pTrip;
                        const updateTrip = { id, name, checkList, notes, locations };
                        for (let user of this.users) {
                            if (user.id == userId) {
                                for (let i = 0; i < user.trips.length; i++) {
                                    const trip = user.trips[i];
                                    if (trip.id === updateTrip.id) {
                                        user.trips[i] = updateTrip;
                                        return { success: { status: 200, message: 'The trip was updated.' } };
                                    }
                                }
                                throw new Error('The trip is not registered.');
                            }
                        }
                        throw new Error('The user is not registered.');
                    },
                    deleteTrip: function(userId, tripId) {
                        for (let user of this.users) {
                            if (user.id == userId) {
                                const index = user.trips.findIndex((trip) => {
                                    return trip.id == tripId;
                                });
                                if (index === -1) throw new Error('The trip is not registered.');
                                user.trips.splice(index, 1);
                                return { success: { status: 200, message: 'The trip was deleted.' } };
                            }
                        }
                        throw new Error('The user is not registered.');
                    }
                };
            }
            return instance;
        }
    };
})();

exports.UserServices = UserServices;