let createMarkdown = (function () {
    function capitalizeTheFirstLetterOfEachWord(words) {
        let separateWord = words.toLowerCase().split(' ');
        for (let i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                separateWord[i].substring(1);
        }
        return separateWord.join(' ');
    }
    let getDate = function () {
        let date = new Date();
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${time}`
    }
    let createTable = function (readCacheResponseModel) {
        let users = readCacheResponseModel.users;
        let index = 1;
        users.sort((a, b) => parseFloat(b.publicContributions) - parseFloat(a.publicContributions));
        let row = `| # |  Name | Followers | Location | Public Contributions |\n| ---- | ---- | ---- | ---- | ---- |\n`;
        for (const user of readCacheResponseModel.users) {
            row = row + `| ${index} | [<img src="${user.avatarUrl}" width="24" alt="Avatar of ${user.login}"> ${user.name}](https://github.com/${user.login}) <sub>(${user.login})</sub> | \`${user.followers}\` | ${user.location} | ${user.publicContributions} |\n`;
            index++;
        }
        return row;
    }
    let createMarkdownList = function (locationDataModel, readCacheResponseModel) {
        let markdown = `# Most active GitHub users in {headerCountry}\n\n` +
            `<img align="right" width="200" src="{imageUrl}">\n\n` +
            `The public contributions to public repos by users in {descriptionCountry} on \`{date}\`. This list contains ` +
            `users from \`Sri Lanka\` and cities \`Colombo\`, \`Gampaha\`.\n\n` +
            `There are \`12 countries\` can be found [here](index.html).\n\n` +
            `There are \`1140\` users in Sri Lanka. You need at least 0 followers to be on this list.\n\n` +
            `| \`Public Contributions\` | [Private Contributions](https://github.com/gayanvoice/javascript-action/edit/master/README.md)  | [Total Contributions](https://github.com/gayanvoice/javascript-action/edit/master/README.md)  |\n` +
            `| ---- | ---- | ---- |\n\n` +
            `{table}\n\n`;
        markdown = markdown.replace(`{headerCountry}`, capitalizeTheFirstLetterOfEachWord(locationDataModel.country));
        markdown = markdown.replace(`{descriptionCountry}`, capitalizeTheFirstLetterOfEachWord(locationDataModel.country));
        markdown = markdown.replace(`{imageUrl}`, locationDataModel.imageUrl);
        markdown = markdown.replace(`{table}`, createTable(readCacheResponseModel));
        markdown = markdown.replace(`{date}`, getDate());
        return markdown;
    }
    return {
        createMarkdownList: createMarkdownList,
    };
})();
module.exports = createMarkdown;
