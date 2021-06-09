const pullGit = require('./helper/git/pull-git');
const commitGit = require('./helper/git/commit-git');
const pushGit = require('./helper/git/push-git');
const configFile = require('./helper/file/config_file');
const outputCheckpoint = require('./helper/checkpoint/output_checkpoint');
const outputCache = require('./helper/cache/output_cache');
const outputMarkdown = require('./helper/markdown/output_markdown');
const createPublicContributionsMarkdown = require('./helper/markdown/create_public_contributions_markdown');
const createTotalContributionsMarkdown = require('./helper/markdown/create_total_contributions_markdown');
const createFollowersMarkdown = require('./helper/markdown/create_followers_markdown');
const requestOctokit = require('./helper/octokit/request_octokit');
let Index = function () {
    let getCheckpoint = async function (locationsArray, country, checkpoint) {
        let indexOfTheCountry = locationsArray.findIndex(location => location.country === country);
        return indexOfTheCountry === checkpoint;
    }
    let getCountryAndUpdateCheckpoint = async function (locationsArray, country, checkpoint) {
        let indexOfTheCountry = locationsArray.findIndex(location => location.country === country);
        if (indexOfTheCountry === checkpoint) {
            await outputCheckpoint.saveCheckpointFile(indexOfTheCountry, locationsArray.length)
            return true;
        } else {
            return false;
        }
    }
    let saveCache = async function (readConfigResponseModel, readCheckpointResponseModel) {
        for await(const locationDataModel of readConfigResponseModel.locations){
            if(await getCheckpoint(
                readConfigResponseModel.locations,
                locationDataModel.country,
                readCheckpointResponseModel.checkpoint)){
                console.log("checkpoint set", locationDataModel.country)
                let json = await requestOctokit.request(locationDataModel.locations);
                await outputCache.saveCacheFile(locationDataModel.country, json);
            } else {
                console.log("checkpoint not set", locationDataModel.country)
            }

        }
    }
    let saveMarkdown = async function (readConfigResponseModel, readCheckpointResponseModel) {
        let locationsArray = readConfigResponseModel.locations;
        let checkpoint = readCheckpointResponseModel.checkpoint;
        for await(const locationDataModel of readConfigResponseModel.locations){
            let countryName = locationDataModel.country;
            if(await getCountryAndUpdateCheckpoint(locationsArray, countryName, checkpoint)){
                let readCacheResponseModel =  await outputCache.readCacheFile(countryName);
                console.log("checkpoint set", countryName)
                if(readCacheResponseModel.status) {
                    console.log("cache file exists", countryName)
                    await outputMarkdown.savePublicContributionsMarkdownFile(countryName,
                        createPublicContributionsMarkdown.create(locationDataModel, readCacheResponseModel, readConfigResponseModel));
                    await outputMarkdown.saveTotalContributionsMarkdownFile(countryName,
                        createTotalContributionsMarkdown.create(locationDataModel, readCacheResponseModel, readConfigResponseModel));
                    await outputMarkdown.saveFollowersMarkdownFile(countryName,
                        createFollowersMarkdown.create(locationDataModel, readCacheResponseModel, readConfigResponseModel))
                } else {
                    console.log("cache file does not exist", countryName)
                }
            } else {
                console.log("checkpoint not set", countryName)
            }
        }
    }
    let main = async function () {
        let readConfigResponseModel = await configFile.readConfigFile();
        let readCheckpointResponseModel = await outputCheckpoint.readCheckpointFile();
        if(readConfigResponseModel.status && readCheckpointResponseModel.status){
            if(!readConfigResponseModel.devMode) await pullGit.pull();
            await saveCache(readConfigResponseModel, readCheckpointResponseModel);
            await saveMarkdown(readConfigResponseModel, readCheckpointResponseModel)
            if(!readConfigResponseModel.devMode){
                await commitGit.commit("Update users");
                await pushGit.push();
            }
        }
    }
    return {
        main: main,
    };
}();
Index.main().then(() => { });