const OctokitPageInfoModel = require('./OctokitPageInfoModel');
const UserDataModel = require('../data/UserDataModel');
let OctokitResponseModel =  function (status, response) {
    let validate = function (value) {
        return (value === '' || value === null || value === undefined);
    }
    let setValue = function (value) {
        if (validate(value)) {
            return "undefined value";
        } else {
            return value;
        }
    }
    let setPublicContributions = function (contributionsCollection) {
        let totalContributions = contributionsCollection.contributionCalendar.totalContributions;
        let privateContributions = contributionsCollection.restrictedContributionsCount;
        return totalContributions - privateContributions;
    }
    let setUsers = function (edges) {
        let array = [];
        for (const node of edges) {
            if(node.node.__typename === 'User'){
                let userDataModel = new UserDataModel(
                    setValue(node.node.login),
                    setValue(node.node.name),
                    setValue(node.node.avatarUrl),
                    setValue(node.node.location),
                    setValue(node.node.company),
                    setValue(node.node.twitterUsername),
                    setValue(node.node.followers.totalCount),
                    setValue(node.node.contributionsCollection.restrictedContributionsCount),
                    setValue(setPublicContributions(node.node.contributionsCollection)))
                array.push(userDataModel)
            }
        }
        return array;
    }
    this.status = status;
    if (status) this.node = setUsers(response.search.edges);
    if (status) this.pageInfo = new OctokitPageInfoModel(response.search.pageInfo);
}
module.exports = OctokitResponseModel;