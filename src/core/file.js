const fs = require('fs-extra')
const OutputFileResponseModel = require('../model/file/OutputFileResponseModel');
const ReadFileResponseModel = require('../model/file/ReadFileResponseModel');
let file = (function () {
    let outputJson = async function (fileName, json) {
        try {
            await fs.outputJson(fileName, json)
            return new OutputFileResponseModel(true, `Json file has been updated at ${fileName}`);
        } catch (error) {
            return new OutputFileResponseModel(false, `Json file has not been updated at ${fileName}`)
        }
    }
    let outputOther = async function (fileName, file) {
        try {
            await fs.outputFile(fileName, file)
            return new OutputFileResponseModel(true, `Other file has been updated at ${fileName}`)
        } catch (error) {
            return new OutputFileResponseModel(false, `Other file has not been updated at ${fileName}`)
        }
    }
    let readJson = async function (fileName) {
        try {
            let json = await fs.readJson(fileName);
            return new ReadFileResponseModel(true, `Json file has been read at ${fileName}`, json);
        } catch (error) {
            return new ReadFileResponseModel(false, `Json file has not been read at ${fileName}`);
        }
    }
    return {
        outputJson: outputJson,
        outputOther: outputOther,
        readJson: readJson,
    };
})();
module.exports = file;
