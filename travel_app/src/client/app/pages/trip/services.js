const TripServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    user: {},
                    baseUserTripEndpoint: '/user/trip/',
                    setHttpRequest: function(httpMethod, httpBodyData = {}) {
                        return {
                            method: httpMethod,
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(httpBodyData)
                        };
                    },
                    createTrip: async function(userid, trip) {
                        const response = await fetch(this.baseUserTripEndpoint + userid, setHttpRequest('PUT', trip));
                        try {
                            const resData = await response.json();
                            return resData;
                        } catch (error) {
                            console.log("Parsing Error", error);
                        }
                    }
                };
            }
            return instance;
        }
    };
})();

export { TripServices };