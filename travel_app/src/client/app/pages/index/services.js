const IndexServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    user: {},
                    baseUserEndpoint: '/user/',
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
                    getUser: function(username) {
                        const response = await fetch(this.baseUserEndpoint + username, this.setHttpRequest('GET'));
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

export { IndexServices };