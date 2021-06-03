const core = require('@actions/core');
const file = require('../../core/file');
let outputCache = (function () {
    let getCountryName = function (country) {
        return country.replace(' ', '_').toLowerCase();
    }
    let save = async function (location, json) {
        let fileName = getCountryName(location[0])
        let path = `cache/${fileName}.json`;
        let outputFileResponseModel = await file.outputJson(path, json);
        if(outputFileResponseModel.status){
            core.info(outputFileResponseModel.message)
        } else {
            core.info(outputFileResponseModel.message)
        }
    }
    return {
        save: save
    };
})();
module.exports = outputCache;
