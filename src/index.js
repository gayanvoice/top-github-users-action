const pullGit = require('./helper/git/pull-git');
const commitGit = require('./helper/git/commit-git');
const pushGit = require('./helper/git/push-git');
const configFile = require('./helper/file/config_file');
const outputCache = require('./helper/cache/output_cache');
const outputMarkdown = require('./helper/markdown/output_markdown');
const createMarkdown = require('./helper/markdown/create_markdown');
const requestOctokit = require('./helper/octokit/request_octokit');
let Index = function () {
    let saveCache = async function (readConfigResponseModel) {
        for await(const locationDataModel of readConfigResponseModel.locations){
            let json = await requestOctokit.request(locationDataModel.locations);
            await outputCache.saveCacheFile(locationDataModel.country, json);
        }
    }
    let saveMarkdown = async function (readConfigResponseModel) {
        for await(const locationDataModel of readConfigResponseModel.locations){
            let readCacheResponseModel =  await outputCache.readCacheFile(locationDataModel.country);
            if(readCacheResponseModel.status) {
                let listMarkdown = createMarkdown.createMarkdownList(locationDataModel, readCacheResponseModel)
                await outputMarkdown.saveMarkdownFile(locationDataModel.country, listMarkdown)
            }
        }
    }
    let main = async function () {
        let readConfigResponseModel = await configFile.readConfigFile();
        if(readConfigResponseModel.status){
            if(!readConfigResponseModel.devMode) await pullGit.pull();
            await saveCache(readConfigResponseModel);
            await saveMarkdown(readConfigResponseModel)
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