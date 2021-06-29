let licenseComponent = function () {
    let create = function (githubUserAndRepository) {
        let markdown = `## 📄 License\n\n`;
        markdown = markdown + `- GitHub Action - [${githubUserAndRepository}-action](https://github.com/${githubUserAndRepository}-action)\n`;
        markdown = markdown + `- Repository - [${githubUserAndRepository}](https://github.com/${githubUserAndRepository})\n`;
        markdown = markdown + `- Data in the \`./cache\` directory - [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/)\n`;
        markdown = markdown + `- Code - [MIT](./LICENSE) © [Gayan Kuruppu](https://github.com/gayanvoice)\n`;
        return markdown;
    }
    return {
        create: create,
    };
}();
module.exports = licenseComponent;