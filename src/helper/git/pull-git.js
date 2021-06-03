const core = require('@actions/core');
const git = require('../../core/git');
let pullGit = function () {
    let pull = async function () {
        core.info(`Git Pull`)
        try {
            await git.pull();
        } catch (error) {
            core.info(error);
        }
    }
    return {
        pull: pull
    };
}();
module.exports = pullGit;