const file = require('../../core/file');
let markdownFile = (function () {
    let outputMarkdownFile = async function (fileName, markdown) {
        let outputFileResponseModel = await file.outputOther(fileName, markdown);
        console.log(outputFileResponseModel.message)
    }
    return {
        outputMarkdownFile: outputMarkdownFile,
    };
})();
module.exports = markdownFile;