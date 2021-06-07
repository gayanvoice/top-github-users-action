const markdownFile = require('../../helper/file/markdown_file');
let outputMarkdown = (function () {
    let setCountryName = function (country) {
        return country.replace(' ', '_').toLowerCase();
    }
    let setPath = function (country) {
        let fileName = setCountryName(country)
        return `markdown/${fileName}.md`;
    }
    let saveMarkdownFile = async function (country, markdown) {
        await markdownFile.outputMarkdownFile(setPath(country), markdown);
    }
    return {
        saveMarkdownFile: saveMarkdownFile,
    };
})();
module.exports = outputMarkdown;
