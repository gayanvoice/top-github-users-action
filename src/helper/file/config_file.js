const file = require('../../core/file');
const ReadConfigResponseModel = require('../../model/config/ReadConfigResponseModel');
let configFile = (function () {
    const path = 'config.json';
    let readConfigFile = async function () {
        let readFileResponseModel = await file.readJson(path);
        console.log(readFileResponseModel.message)
        if(readFileResponseModel.status){
            return new ReadConfigResponseModel(readFileResponseModel.status, readFileResponseModel.content);
        } else {
            return new ReadConfigResponseModel(readFileResponseModel.status);
        }
    }
    return {
        readConfigFile: readConfigFile
    };
})();
module.exports = configFile;