const core = require('@actions/core');
const file = require('../../core/file');
const ReadCacheResponseModel = require('../../model/cache/ReadCacheResponseModel');
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
    let read = async function (location) {
        let fileName = getCountryName(location[0])
        let path = `cache/${fileName}.json`;
        let readFileResponseModel = await file.readJson(path);
        if(readFileResponseModel.status){
            return new ReadCacheResponseModel(
                readFileResponseModel.status,
                readFileResponseModel.content.login,
                readFileResponseModel.content.name,
                readFileResponseModel.content.avatarUrl,
                readFileResponseModel.content.location,
                readFileResponseModel.content.followers,
                readFileResponseModel.content.privateContributions,
                readFileResponseModel.content.publicContributions)
        } else {
            return new ReadCacheResponseModel(readFileResponseModel.status)
        }
    }
    return {
        save: save,
        read: read
    };
})();
module.exports = outputCache;
