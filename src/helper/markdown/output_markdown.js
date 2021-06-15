const markdownFile = require('../../helper/file/markdown_file');
let outputMarkdown = (function () {
    let setCountryName = function (country) {
        return country.replace(/\s/g, '_').toLowerCase();
    }
    let setIndexPath = function () {
        return `README.md`;
    }
    let setPublicContributionsPath = function (country) {
        let fileName = setCountryName(country)
        return `markdown/public_contributions/${fileName}.md`;
    }
    let setTotalContributionsPath = function (country) {
        let fileName = setCountryName(country)
        return `markdown/total_contributions/${fileName}.md`;
    }
    let setFollowersPath = function (country) {
        let fileName = setCountryName(country)
        return `markdown/followers/${fileName}.md`;
    }
    let saveIndexMarkdownFile = async function (markdown) {
        await markdownFile.outputMarkdownFile(setIndexPath(), markdown);
    }
    let savePublicContributionsMarkdownFile = async function (country, markdown) {
        await markdownFile.outputMarkdownFile(setPublicContributionsPath(country), markdown);
    }
    let saveTotalContributionsMarkdownFile = async function (country, markdown) {
        await markdownFile.outputMarkdownFile(setTotalContributionsPath(country), markdown);
    }
    let saveFollowersMarkdownFile = async function (country, markdown) {
        await markdownFile.outputMarkdownFile(setFollowersPath(country), markdown);
    }
    return {
        saveIndexMarkdownFile: saveIndexMarkdownFile,
        savePublicContributionsMarkdownFile: savePublicContributionsMarkdownFile,
        saveTotalContributionsMarkdownFile: saveTotalContributionsMarkdownFile,
        saveFollowersMarkdownFile: saveFollowersMarkdownFile,
    };
})();
module.exports = outputMarkdown;