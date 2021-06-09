const formatMarkdown = require('./format_markdown');
let createTotalContributionsMarkdown = (function () {
    let createTable = function (readCacheResponseModel) {
        let users = readCacheResponseModel.users;
        let index = 1;
        users.sort((a, b) => parseFloat(b.publicContributions + b.privateContributions) -
            parseFloat(a.publicContributions + a.privateContributions));
        let row = `<table>\n`;
        row = row + `\t<tr>\n`;
        row = row + `\t\t<th>#</th>\n`;
        row = row + `\t\t<th>Name</th>\n`;
        row = row + `\t\t<th>Company</th>\n`;
        row = row + `\t\t<th>Twitter Username</th>\n`;
        row = row + `\t\t<th>Location</th>\n`;
        row = row + `\t\t<th>Public Contributions</th>\n`;
        row = row + `\t\t<th>Total Contributions</th>\n`;
        row = row + `\t</tr>\n`;
        for (const user of readCacheResponseModel.users) {
            if(user.publicContributions + user.privateContributions> 0){
                row = row + `\t<tr>\n`;
                row = row + `\t\t<td>${index}</td>\n`;
                row = row + `\t\t<td>\n`;
                row = row + `\t\t\t<a href="https://github.com/${user.login}">\n`;
                row = row + `\t\t\t\t<img src="${user.avatarUrl}" width="24" alt="Avatar of ${user.login}"> ${user.login}\n`;
                row = row + `\t\t\t</a><br/>\n`;
                row = row + `\t\t\t${formatMarkdown.getName(user.name)}\n`;
                row = row + `\t\t</td>\n`;
                row = row + `\t\t<td>${formatMarkdown.getCompany(user.company)}</td>\n`;
                row = row + `\t\t<td>${formatMarkdown.getTwitterUsername(user.twitterUsername)}</td>\n`;
                row = row + `\t\t<td>${user.location}</td>\n`;
                row = row + `\t\t<td>${user.publicContributions}</td>\n`;
                row = row + `\t\t<td>${user.publicContributions + user.privateContributions}</td>\n`;
                row = row + `\t</tr>\n`;
            }
            index++;
        }
        row = row + `</table>\n`;
        return row;
    }
    let create = function (GITHUB_REPOSITORY, locationDataModel, readCacheResponseModel, readConfigResponseModel) {
        let country = formatMarkdown.capitalizeTheFirstLetterOfEachWord(locationDataModel.country);
        let indexUrl  = `https://github.com/${GITHUB_REPOSITORY}`
        let publicContributionsUrl  = `${indexUrl}/blob/main/markdown/public_contributions/${formatMarkdown.getCountryName(locationDataModel.country)}.md`;
        let followersUrl  = `${indexUrl}/blob/main/markdown/followers/${formatMarkdown.getCountryName(locationDataModel.country)}.md`;
        let markdown = `# Top GitHub Users By Total Contributions in ${country}\n\n`;
        markdown = markdown + `<img align="right" width="200" src="${locationDataModel.imageUrl}" alt="${country}">\n\n`;
        markdown = markdown + `The contributions to public and private repositories by users in ${country} on \`${formatMarkdown.getDate()}\`. `;
        markdown = markdown + `This list contains users from ${formatMarkdown.getLocations(locationDataModel)}.\n\n`;
        markdown = markdown + `There are \`${readConfigResponseModel.locations.length} countries\` can be found [here](${indexUrl}).\n\n`;
        markdown = markdown + `There are \`${readCacheResponseModel.users.length} users\`  in ${country}. You need at least \`${formatMarkdown.getMinimumFollowersRequirement(readCacheResponseModel)} followers\` to be on this list.\n\n`;
        markdown = markdown + `<table>\n`;
        markdown = markdown + `\t<tr>\n`;
        markdown = markdown + `\t\t<td>\n`;
        markdown = markdown + `\t\t\t<a href="${publicContributionsUrl}">Top Users By Public Contributions</a>\n`;
        markdown = markdown + `\t\t</td>\n`;
        markdown = markdown + `\t\t<td>\n`;
        markdown = markdown + `\t\t\t<strong>Top Users By Total Contributions</strong>\n`;
        markdown = markdown + `\t\t</td>\n`;
        markdown = markdown + `\t\t<td>\n`;
        markdown = markdown + `\t\t\t<a href="${followersUrl}">Top Users By Followers</a>\n`;
        markdown = markdown + `\t\t</td>\n`;
        markdown = markdown + `\t</tr>\n`;
        markdown = markdown + `</table>\n`;
        markdown = markdown + `${createTable(readCacheResponseModel)}\n\n`;
        return markdown;
    }
    return {
        create: create,
    };
})();
module.exports = createTotalContributionsMarkdown;
