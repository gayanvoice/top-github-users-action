const core = require('@actions/core');
const octokit = require('../../core/octokit');
let requestOctokit = function () {
    let setQuery = function (location) {
        let query = '';
        for (const place of location) {
            query = query + `location:${place} `;
        }
        return query;
    }
    let request = async function (location) {
        console.log(setQuery(location))
        let hasNextPage = true;
        let cursor = null;
        let array = [];
        for (; hasNextPage;) {
            let octokitResponseModel = await octokit.request(setQuery(location), cursor);
            if(octokitResponseModel.status){
                hasNextPage = octokitResponseModel.pageInfo.hasNextPage;
                cursor = octokitResponseModel.pageInfo.endCursor;
                for(const user of octokitResponseModel.node){
                    console.log(user.login)
                    array.push(user)
                }
            }
        }
        return array;
    }
    return {
        request: request
    };
}();
module.exports = requestOctokit;