const UserDataModel = require('../data/UserDataModel');
let ReadCacheResponseModel = function (status, content) {
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
    let setUsers = function (content) {
        let array = [];
        for(const user of content){
            let userDataModel = new UserDataModel(
                setValue(user.login),
                setValue(user.name),
                setValue(user.avatarUrl),
                setValue(user.location),
                setValue(user.company),
                setValue(user.twitterUsername),
                setValue(user.followers),
                setValue(user.privateContributions),
                setValue(user.publicContributions))
            array.push(userDataModel)
        }
        return array;
    }
    this.status = status;
    if (status) this.users = setUsers(content)
}
module.exports = ReadCacheResponseModel;