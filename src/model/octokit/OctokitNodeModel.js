let OctokitNodeModel =  function (node) {
    let setPublicContributions = function (contributionsCollection) {
        let totalContributions = contributionsCollection.contributionCalendar.totalContributions;
        let privateContributions = contributionsCollection.restrictedContributionsCount;
        return totalContributions - privateContributions;
    }
    this.login = node.login;
    this.name = node.name;
    this.avatarUrl = node.avatarUrl;
    this.location = node.location;
    this.followers = node.followers.totalCount;
    this.public = setPublicContributions(node.contributionsCollection);
    this.private = node.contributionsCollection.restrictedContributionsCount;
}
module.exports = OctokitNodeModel;