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
                                fromDate: '2020-07-10',
                                toDate: '2020-07-17'
                            }]
                        }]
                    }],
                    getUser: function(username) {
                        const data = this.users.find((user) => {
                            return user.username === username;
                        });
                        return { data };
                    },
                    createTrip: function(userId, trip) {
                        for (let user of this.users) {
                            if (user.id === userId) {
                                user.trips.push({ id: user.idCounter++, ...trip });
                                return { success: { status: 200, message: 'The trip was created.' } };
                            }
                        }
                        throw 'The user is not registered';
                    },
                    updateTrip: function(userId, pTrip) {
                        for (let user of this.users) {
                            if (user.id === userId) {
                                for (let trip of user.trips) {
                                    if (trip.id === pTrip.id) {
                                        trip = pTrip;
                                        return { success: { status: 200, message: 'The trip was updated.' } };
                                    }
                                }
                                throw 'The trip is not registered.';
                            }
                        }
                        throw 'The user is not registered.';
                    },
                    deleteTrip: function(userId, tripId) {
                        for (let user of this.users) {
                            if (user.id === userId) {
                                const plannedTrips = user.trips.length;
                                const trips = user.trips.map((trip) => {
                                    if (trip.id !== tripId) return trip;
                                });
                                user.trips = trips;
                                if (user.trips.length === plannedTrips) throw 'The trip is not registered.';
                                return { success: { status: 200, message: 'The trip was deleted.' } };
                            }
                        }
                        throw 'The user is not registered.';
                    }
                };
            }
            return instance;
        }
    };
})();

exports.UserServices = UserServices;