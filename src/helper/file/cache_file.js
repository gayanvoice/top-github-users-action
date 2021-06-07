const file = require('../../core/file');
const ReadCacheResponseModel = require('../../model/cache/ReadCacheResponseModel');
let cacheFile = (function () {
    let outputCacheFile = async function (fileName, json) {
        let outputFileResponseModel = await file.outputJson(fileName, json);
        if(outputFileResponseModel.status){
            console.log(outputFileResponseModel.message)
        } else {
            console.log(outputFileResponseModel.message)
        }
    }
    let readCacheFile = async function (fileName) {
        let readFileResponseModel = await file.readJson(fileName);
        if(readFileResponseModel.status){
            return new ReadCacheResponseModel(readFileResponseModel.status, readFileResponseModel.content)
        } else {
            return new ReadCacheResponseModel(readFileResponseModel.status)
        }
    }
    return {
        outputCacheFile: outputCacheFile,
        readCacheFile: readCacheFile
    };
})();
module.exports = cacheFile;
