let ReadFileResponseModel =  function (status, message, content) {
    this.status = status;
    this.message = message;
    if(status) this.content = content;
}
module.exports = ReadFileResponseModel;