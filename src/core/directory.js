const fs = require('fs-extra')
let directory = (function () {
    let createDirectory = async function (directory) {
        try {
            await fs.ensureDir(directory);
        } catch (error) {
            console.log(error);
        }
    }
    let createGitIgnore = async function (directory) {
        let path = `${directory}/.gitkeep`;
        try {
            await fs.outputFile(path, '')
        } catch (error) {
            console.log(error);
        }
    }
    return {
        createDirectory: createDirectory,
        createGitIgnore: createGitIgnore
    };
})();
module.exports = directory;