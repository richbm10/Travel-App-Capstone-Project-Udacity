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
                        try {
                            const resData = await response.json();
                            return resData;
                        } catch (error) {
                            console.log("Parsing Error", error);
                        }
                    },
                    getLocationImage: async function(location) {
                        const query = `${location}/1`;
                        const response = await fetch(this.baseLocationImageEndpoint + query);
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
                            promises.push(this.getLocationImage(location.location));
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

export { IndexServices };