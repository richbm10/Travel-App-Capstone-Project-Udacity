const LocationServices = (function() {
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

exports.LocationServices = LocationServices;