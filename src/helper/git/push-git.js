const core = require('@actions/core');
const git = require('../../core/git');
let pushGit = function () {
    const BRANCH = 'main';
    let push = async function () {
        core.info(`Git Push`);
        try {
            await git.push(BRANCH);
        } catch (error) {
            core.info(error);
        }
    }
    return {
        push: push
    };
}();
module.exports = pushGit;