const core = require('@actions/core');
const file = require('../../core/file');
let markdownFile = (function () {
    let outputMarkdownFile = async function (fileName, markdown) {
        let outputFileResponseModel = await file.outputOther(fileName, markdown);
        if(outputFileResponseModel.status){
            core.info(outputFileResponseModel.message)
        } else {
            core.info(outputFileResponseModel.message)
        }
    }
    return {
        outputMarkdownFile: outputMarkdownFile,
    };
})();
module.exports = markdownFile;
