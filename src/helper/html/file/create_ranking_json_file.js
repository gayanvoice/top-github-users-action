const formatMarkdown = require('../../markdown/format_markdown');
const outputCache = require('../../../helper/cache/output_cache');
let createRankingJsonFile = (function () {
    let create = async function (readConfigResponseModel) {
        let countriesArray = [];
        for await(const locationDataModel of readConfigResponseModel.locations){
            let readCacheResponseModel =  await outputCache.readCacheFile(locationDataModel.country);
            let totalContributions = 0;
            if(readCacheResponseModel.status) {
                for(const user of readCacheResponseModel.users){
                    totalContributions = totalContributions + (user.publicContributions + user.privateContributions);
                }
                countriesArray.push({ name: formatMarkdown.capitalizeTheFirstLetterOfEachWord(locationDataModel.country), value: totalContributions})
            }
        }
        return { ranking: countriesArray};
    }
    return {
        create: create,
    };
})();
module.exports = createRankingJsonFile;