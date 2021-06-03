const core = require('@actions/core');
const file = require('../../core/file');
let cacheFile = (function () {
    let outputCacheFile = async function (fileName, json) {
        let outputFileResponseModel = await file.outputJson(fileName, json);
        if(outputFileResponseModel.status){
            core.info(outputFileResponseModel.message)
        } else {
            core.info(outputFileResponseModel.message)
        }
    }
    let readCacheFile = async function (fileName) {
        return await file.readJson(fileName);
    }
    return {
        outputCacheFile: outputCacheFile,
        readCacheFile: readCacheFile
    };
})();
module.exports = cacheFile;
