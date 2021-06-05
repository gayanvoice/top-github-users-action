let ReadCacheResponseModel = function (status,
                                       login,
                                       name,
                                       avatarUrl,
                                       location,
                                       followers,
                                       publicContributions,
                                       privateContributions) {
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
    this.status = status;
    if (status) this.login = setValue(login);
    if (status) this.name = setValue(name);
    if (status) this.avatarUrl = setValue(avatarUrl);
    if (status) this.location = setValue(location);
    if (status) this.followers = setValue(followers);
    if (status) this.privateContributions = setValue(privateContributions);
    if (status) this.publicContributions = setValue(publicContributions);
}
module.exports = ReadCacheResponseModel;