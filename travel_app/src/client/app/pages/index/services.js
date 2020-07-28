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