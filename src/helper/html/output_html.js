const htmlFile = require('../../helper/file/html_file');
let outputHtml = (function () {
    const HTML_FILE = "index.html";
    const RANKING_FILE = "ranking.json"
    let setHtmlFilePath = function () {
        return `docs/${HTML_FILE}`;
    }
    let setRankingJsonFilePath = function () {
        return `docs/${RANKING_FILE}`;
    }
    let saveHtmlFile = async function (html) {
        await htmlFile.outputHtmlFile(setHtmlFilePath(), html);
    }
    let saveRankingJsonFile = async function (json) {
        await htmlFile.outputJsonFile(setRankingJsonFilePath(), json);
    }
    return {
        saveHtmlFile: saveHtmlFile,
        saveRankingJsonFile: saveRankingJsonFile
    };
})();
module.exports = outputHtml;