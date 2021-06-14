let ReadCheckpointResponseModel =  function (status, content) {
    let validate = function (value) {
        return !(value === '' || value === null || value === undefined);
    }
    let setCheckpoint = function (checkpoint) {
        if(validate(checkpoint)){
            return checkpoint;
        } else {
            return 0;
        }
    }
    this.status = status;
    if(status) this.checkpoint = setCheckpoint(content.checkpoint);
}
module.exports = ReadCheckpointResponseModel;