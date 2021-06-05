const pullGit = require('./helper/git/pull-git');
const commitGit = require('./helper/git/commit-git');
const pushGit = require('./helper/git/push-git');
const configFile = require('./helper/file/config_file');
const outputCache = require('./helper/cache/output_cache');
const outputMarkdown = require('./helper/file/markdown_file');
const requestOctokit = require('./helper/octokit/request_octokit');
let Index = function () {
    let saveCache = async function (locations) {
        for await(const location of locations){
            let json = await requestOctokit.request(location);
            await outputCache.save(location, json);
        }
    }
    let saveMarkdown = async function (locations) {
        for await(const location of locations){
            let readCacheResponseModel =  await outputCache.read(location);
        }
    }
    let main = async function () {
        let readConfigResponseModel = await configFile.readConfigFile();
        if(readConfigResponseModel.status){
            if(!readConfigResponseModel.devMode) await pullGit.pull();
            await saveCache(readConfigResponseModel.locations);
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