const UserServices = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    serviceData: {}
                };
            }
            return instance;
        }
    };
})();

exports.UserServices = UserServices;