const TripServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    baseUserTripEndpoint: '/user/trip/',
                    baseLocationImageEndpoint: '/image/location/',
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
                        const response = await fetch(this.baseUserTripEndpoint + userid, this.setHttpRequest('PUT', trip));
                        const resData = await response.json();
                        if (resData.hasOwnProperty('error')) throw (`${resData.error.status} ${resData.error.message}`);
                        return resData;
                    },
                    updateTrip: async function(userid, trip) {
                        const response = await fetch(this.baseUserTripEndpoint + userid, this.setHttpRequest('POST', trip));
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
                    }
                };
            }
            return instance;
        }
    };
})();

export { TripServices };