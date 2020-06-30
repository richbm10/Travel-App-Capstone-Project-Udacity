const UserServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    users: [{
                        id: 1,
                        name: 'Ricardo',
                        lastName: 'Bonilla Morales',
                        username: 'richi_bonilla10',
                        plannedTrips: 1,
                        trips: [{
                            id: 1,
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
                                user.trips.push(trip);
                                break;
                            }
                        }
                    },
                    updateTrip: function(userId, pTrip) {
                        for (let user of this.users) {
                            if (user.id === userId) {
                                for (let trip of user.trips) {
                                    if (trip.id === pTrip.id) {
                                        trip = pTrip;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    },
                    deleteTrip: function(userId, tripId) {
                        for (let user of this.users) {
                            if (user.id === userId) {
                                const trips = user.trips.map((trip) => {
                                    if (trip.id !== tripId) return trip;
                                });
                                user.trips = trips;
                                break;
                            }
                        }
                    }
                };
            }
            return instance;
        }
    };
})();

exports.UserServices = UserServices;