const simpleGit = require('simple-git');
let git = (function () {
    const git = simpleGit();
    let pull = async function () {
        await git.pull();
    }
    let commit = async function (username, email, message) {
        await git.addConfig('user.name', username)
        await git.addConfig('user.email', email)
        await git.add('./*')
        await git.commit(message)
    }
    let push = async function (branch) {
        await git.push('origin', branch);
    }
    return {
        pull: pull,
        commit: commit,
        push: push
    };
})();
module.exports = git;