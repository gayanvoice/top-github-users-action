const LocationDataModel = require('../data/LocationDataModel');
let ReadConfigResponseModel =  function (status, content) {
    let validate = function (value) {
        return !(value === '' || value === null || value === undefined || (typeof value) !== 'string');
    }
    let setDevMode = function (devMode) {
        if(validate(devMode)){
            return devMode === "true";
        } else {
            return true;
        }
    }
    let setGeoName = function (geoName) {
        if(validate(geoName)){
            return geoName;
        } else {
            return null;
        }
    }
    let setLocations = function (locations) {
        let locationArray = [];
        for (const location of locations) {
            let country = location.country;
            let geoName = setGeoName(location.geoName);
            let imageUrl = location.imageUrl;
            if(validate(country)) {
                let array = [];
                array.push(country)
                for (const city of location.cities) {
                    if (validate(city)) {
                        array.push(city)
                    }
                }
                locationArray.push(new LocationDataModel(country, geoName, array, imageUrl))
            }
        }
        return locationArray;
    }
    this.status = status;
    if(status) this.devMode = setDevMode(content.devMode);
    if(status) this.locations = setLocations(content.locations);
    if(status) this.checkpoint = content.checkpoint;
}
module.exports = ReadConfigResponseModel;