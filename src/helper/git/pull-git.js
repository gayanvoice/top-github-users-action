const git = require('../../core/git');
let pullGit = function () {
    let pull = async function () {
        console.log(`Git Pull`)
        try {
            await git.pull();
        } catch (error) {
            console.log(error);
        }
    }
    return {
        pull: pull
    };
}();
module.exports = pullGit;