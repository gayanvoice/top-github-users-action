const formatMarkdown = require('../format_markdown');
const headerComponent = require('../component/header_component');
const starComponent = require('../component/star_component');
const socialMediaComponent = require('../component/social_media_component');
const shortcutMenuComponent = require('../component/shortcut_menu_component');
const thirdPartyComponent = require('../component/third_party_component');
const licenseComponent = require('../component/license_component');
let createTotalContributionsPage = (function () {
    let createUserTableByPublicContributions = function (readCacheResponseModel) {
        readCacheResponseModel.users.sort((a, b) => parseFloat(b.publicContributions + b.privateContributions) - parseFloat(a.publicContributions + a.privateContributions));
        let index = 1;
        let table = ``;
        if (readCacheResponseModel.users === undefined || readCacheResponseModel.users.length === 0) {
            table = table + `<h4>The table is empty</h4>`;
        } else {
            table = table + `<table>\n`;
            table = table + `\t<tr>\n`;
            table = table + `\t\t<th>#</th>\n`;
            table = table + `\t\t<th>Name</th>\n`;
            table = table + `\t\t<th>Company</th>\n`;
            table = table + `\t\t<th>Twitter Username</th>\n`;
            table = table + `\t\t<th>Location</th>\n`;
            table = table + `\t\t<th>Public Contributions</th>\n`;
            table = table + `\t\t<th>Total Contributions</th>\n`;
            table = table + `\t</tr>\n`;
            for (const user of readCacheResponseModel.users) {
                if (user.publicContributions + user.privateContributions > 0 && index <= 1000) {
                    table = table + `\t<tr>\n`;
                    table = table + `\t\t<td>${index}</td>\n`;
                    table = table + `\t\t<td>\n`;
                    table = table + `\t\t\t<a href="https://github.com/${user.login}">\n`;
                    table = table + `\t\t\t\t<img src="${user.avatarUrl}" width="24" alt="Avatar of ${user.login}"> ${user.login}\n`;
                    table = table + `\t\t\t</a><br/>\n`;
                    table = table + `\t\t\t${formatMarkdown.getName(user.name)}\n`;
                    table = table + `\t\t</td>\n`;
                    table = table + `\t\t<td>${formatMarkdown.getCompany(user.company)}</td>\n`;
                    table = table + `\t\t<td>${formatMarkdown.getTwitterUsername(user.twitterUsername)}</td>\n`;
                    table = table + `\t\t<td>${user.location}</td>\n`;
                    table = table + `\t\t<td>${user.publicContributions}</td>\n`;
                    table = table + `\t\t<td>${user.publicContributions + user.privateContributions}</td>\n`;
                    table = table + `\t</tr>\n`;
                }
                index++;
            }
            table = table + `</table>\n\n`;
        }
        return table;
    }
    let create = function (outputMarkdownModel) {
        let country = formatMarkdown.capitalizeTheFirstLetterOfEachWord(outputMarkdownModel.locationDataModel.country);
        let markdown = headerComponent.create(`Total Contributions`, country);
        markdown = markdown + `<a href="https://gayanvoice.github.io/top-github-users/index.html">\n`;
        markdown = markdown + `\t<img align="right" width="200" src="${outputMarkdownModel.locationDataModel.imageUrl}" alt="${country}">\n`;
        markdown = markdown + `</a>\n\n`;
        markdown = markdown + `The \`public contributions\` and \`private contributions\` by users in ${country} on \`${formatMarkdown.getDate()}\`. `;
        markdown = markdown + `This list contains users from ${formatMarkdown.getLocations(outputMarkdownModel.locationDataModel)}.\n\n`;
        markdown = markdown + `There are \`${outputMarkdownModel.readConfigResponseModel.locations.length} countries\` and \`${formatMarkdown.getNumberOfCities(outputMarkdownModel.readConfigResponseModel)} cities\` can be found [here](https://github.com/${outputMarkdownModel.githubUsernameAndRepository}).\n\n`;
        markdown = markdown + `There are \`${outputMarkdownModel.readCacheResponseModel.users.length} users\`  in ${country}. You need at least \`${formatMarkdown.getMinimumFollowersRequirement(outputMarkdownModel.readCacheResponseModel)} followers\` to be on this list.\n\n`;
        markdown = markdown + starComponent.create();
        markdown = markdown + shortcutMenuComponent.create(
            `https://github.com/${outputMarkdownModel.githubUsernameAndRepository}`,
            outputMarkdownModel.locationDataModel.country,
            1);
        markdown = markdown + `### 🚀 Share on\n\n`;
        markdown = markdown + socialMediaComponent.create(
            `Top GitHub Users By Total Contributions in ${country}`,
            "List of most active github users based on total contributions by country",
            `https://github.com/${outputMarkdownModel.githubUsernameAndRepository}/blob/main/markdown/total_contributions/${formatMarkdown.getCountryName(outputMarkdownModel.locationDataModel.country)}.md`);
        markdown = markdown + createUserTableByPublicContributions(outputMarkdownModel.readCacheResponseModel);
        markdown = markdown + `### 🚀 Share on\n\n`;
        markdown = markdown + socialMediaComponent.create(
            `Top GitHub Users By Total Contributions in ${country}`,
            `List of most active github users based on total contributions by country`,
            `https://github.com/${outputMarkdownModel.githubUsernameAndRepository}/blob/main/markdown/total_contributions/${formatMarkdown.getCountryName(outputMarkdownModel.locationDataModel.country)}.md`);
        markdown = markdown + thirdPartyComponent.create();
        markdown = markdown + licenseComponent.create(outputMarkdownModel.githubUsernameAndRepository);
        return markdown;
    }
    return {
        create: create,
    };
})();
module.exports = createTotalContributionsPage;