const file = require('../../core/file');
const ReadCheckpointResponseModel = require('../../model/checkpoint/ReadCheckpointResponseModel');
let checkpointFile = (function () {
    const path = 'checkpoint.json';
    let outputCheckpointFile = async function (json) {
        let outputFileResponseModel = await file.outputJson(path, json);
        console.log(outputFileResponseModel.message)
    }
    let readCheckpointFile = async function () {
        let readFileResponseModel = await file.readJson(path);
        console.log(readFileResponseModel.message)
        if(readFileResponseModel.status){
            return new ReadCheckpointResponseModel(readFileResponseModel.status, readFileResponseModel.content);
        } else {
            return new ReadCheckpointResponseModel(readFileResponseModel.status);
        }
    }
    return {
        readCheckpointFile: readCheckpointFile,
        outputCheckpointFile: outputCheckpointFile
    };
})();
module.exports = checkpointFile;