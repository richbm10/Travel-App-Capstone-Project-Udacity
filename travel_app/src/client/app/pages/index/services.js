const IndexServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    user: {},
                    baseUserEndpoint: '/user/',
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
                    getUser: async function(username) {
                        const response = await fetch(this.baseUserEndpoint + username, this.setHttpRequest('GET'));
                        try {
                            const resData = await response.json();
                            return resData;
                        } catch (error) {
                            console.log("Parsing Error", error);
                        }
                    },
                    getLocationImage: async function(location) {
                        const query = `${location}/1`;
                        const response = await fetch(this.baseUserEndpoint + query, this.setHttpRequest('GET'));
                        try {
                            const resData = await response.json();
                            return resData;
                        } catch (error) {
                            console.log("Parsing Error", error);
                        }
                    },
                    getTripImages: async function(locations) {
                        const promises = [];
                        locations.forEach(location => {
                            promises.push(getLocationImage(location.location));
                        });
                        const results = await Promise.all(promises);
                    }
                };
            }
            return instance;
        }
    };
})();

export { IndexServices };