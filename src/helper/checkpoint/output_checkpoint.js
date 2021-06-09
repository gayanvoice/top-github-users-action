const checkpointFile = require('../../helper/file/checkpoint_file');
let outputCheckpoint = (function () {
    let saveCheckpointFile = async function (index, length) {
        let checkpoint;
        if(index >= (length - 1)){
            checkpoint = { checkpoint: 0 }
        } else {
            checkpoint = { checkpoint: index + 1 }
        }
        await checkpointFile.outputCheckpointFile(checkpoint);
    }
    let readCheckpointFile = async function () {
        return await checkpointFile.readCheckpointFile();
    }
    return {
        saveCheckpointFile: saveCheckpointFile,
        readCheckpointFile: readCheckpointFile
    };
})();
module.exports = outputCheckpoint;
