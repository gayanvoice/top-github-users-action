let thirdPartyComponent = function () {
    let create = function () {
        let markdown = `## 📦 Third party\n\n`;
        markdown = markdown + `- [@octokit/graphql](https://www.npmjs.com/package/@octokit/graphql) - Send GraphQL requests to GitHub API.\n`;
        markdown = markdown + `- [fs-extra](https://www.npmjs.com/package/fs-extra) - Creating directories and files.\n`
        markdown = markdown + `- [simple-git](https://www.npmjs.com/package/simple-git) - Handling Git commands.\n`
        return markdown;
    }
    return {
        create: create,
    };
}();
module.exports = thirdPartyComponent;
