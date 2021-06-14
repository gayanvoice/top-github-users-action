const file = require('../../core/file');
let htmlFile = function () {
    let outputHtmlFile = async function (fileName, html) {
        let outputFileResponseModel = await file.outputOther(fileName, html);
        console.log(outputFileResponseModel.message)
    }
    let outputJsonFile = async function (fileName, json) {
        let outputFileResponseModel = await file.outputJson(fileName, json);
        console.log(outputFileResponseModel.message)
    }
    return {
        outputHtmlFile: outputHtmlFile,
        outputJsonFile: outputJsonFile
    };
}();
module.exports = htmlFile;