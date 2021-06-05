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
    this.privateContributions = node.contributionsCollection.restrictedContributionsCount;
    this.publicContributions = setPublicContributions(node.contributionsCollection);
}
module.exports = OctokitNodeModel;