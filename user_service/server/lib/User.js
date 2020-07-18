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
                                location: 'Washington,DC',
                                country: 'usa',
                                lat: 38.892062,
                                lon: -77.019912,
                                fromDate: '7/7/2020',
                                toDate: '7/28/2020'
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
                                for (let trip of user.trips) {
                                    if (trip.id === updateTrip.id) {
                                        trip = updateTrip;
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