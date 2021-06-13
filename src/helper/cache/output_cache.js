const cacheFile = require('../../helper/file/cache_file');
let outputCache = (function () {
    let getCountryName = function (country) {
        return country.replace(/\s/g, '_').toLowerCase();
    }
    let getPath = function (country) {
        let fileName = getCountryName(country)
        return `cache/${fileName}.json`;
    }
    let saveCacheFile = async function (country, json) {
        await cacheFile.outputCacheFile(getPath(country), json);
    }
    let readCacheFile = async function (country) {
        return await cacheFile.readCacheFile(getPath(country));
    }
    return {
        saveCacheFile: saveCacheFile,
        readCacheFile: readCacheFile
    };
})();
module.exports = outputCache;
