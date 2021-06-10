const git = require('../../core/git');
let pushGit = function () {
    const BRANCH = 'main';
    let push = async function () {
        console.log(`Git Push`);
        try {
            await git.push(BRANCH);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        push: push
    };
}();
module.exports = pushGit;