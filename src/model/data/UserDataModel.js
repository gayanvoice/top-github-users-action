let UserDataModel = function (
    login,
    name,
    avatarUrl,
    location,
    followers,
    privateContributions,
    publicContributions) {
    this.login = login;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.location = location;
    this.followers = followers;
    this.privateContributions = privateContributions;
    this.publicContributions = publicContributions;
}
module.exports = UserDataModel;