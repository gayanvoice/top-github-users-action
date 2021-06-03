let ReadFileResponseModel =  function (status, content) {
    this.status = status;
    if(status) this.content = content;
}
module.exports = ReadFileResponseModel;