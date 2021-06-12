const formatMarkdown = require('../format_markdown');
const headerComponent = require('../component/header_component');
const socialMediaComponent = require('../component/social_media_component');
const thirdPartyComponent = require('../component/third_party_component');
const licenseComponent = require('../component/license_component');
let createIndexPage = (function () {
    let createListOfCities = function (locationDataModel) {
        let cities = ``;
        for(const location of locationDataModel.locations) {
            if(locationDataModel.country !== location) {
                cities = cities + `\t\t\t<code>${formatMarkdown.capitalizeTheFirstLetterOfEachWord(location)}</code> \n`;
            }
        }
        return cities;
    }
    let getNumberOfCities = function (readConfigResponseModel) {
        let numberOfCities = 0;
        for(const locationDataModel of readConfigResponseModel.locations) {
            for (const location of locationDataModel.locations) {
                if (locationDataModel.country !== location) {
                    numberOfCities++;
                }
            }
        }
        return numberOfCities;
    }
    let createListOfCountriesAndCitiesTable = function (indexUrl, readConfigResponseModel) {
        readConfigResponseModel.locations.sort((a,b) => a.country > b.country ? 1 : -1);
        let table = `<table>\n`;
        table = table + `\t<tr>\n`;
        table = table + `\t\t<th>\n`;
        table = table + `\t\t\tCountry/State\n`;
        table = table + `\t\t</th>\n`;
        table = table + `\t\t<th>\n`;
        table = table + `\t\t\tCities\n`;
        table = table + `\t\t</th>\n`;
        table = table + `\t</tr>\n`;
        for(const locationDataModel of readConfigResponseModel.locations) {
            table = table + `\t<tr>\n`;
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<a href="${indexUrl}/blob/main/markdown/public_contributions/${formatMarkdown.getCountryName(locationDataModel.country)}.md">\n`;
            table = table + `\t\t\t\t${formatMarkdown.capitalizeTheFirstLetterOfEachWord(locationDataModel.country)}\n`;
            table = table + `\t\t\t</a>\n`;
            table = table + `\t\t</td>\n`;
            table = table + `\t\t<td>\n`;
            table = table + createListOfCities(locationDataModel);
            table = table + `\t\t</td>\n`;
            table = table + `\t</tr>\n`;
        }
        table = table + `</table>\n\n`;
        return table;
    }
    let create = function (githubUsernameAndRepository, readConfigResponseModel) {
        let markdown = headerComponent.create();
        markdown = markdown + `<img align="right" width="200" src="https://github.com/gayanvoice/top-github-users-monitor/raw/master/public/images/banner/top-github-users-map.png" alt="Sri Lanka">\n\n`;
        markdown = markdown + `List of most active GitHub users based on \`public contributions\` \`private contributions\` and \`number of followers\`  by country or state. `;
        markdown = markdown + `The list updated \`${formatMarkdown.getDate()}\`.\n\n`;
        markdown = markdown + `This repository contains users \`${readConfigResponseModel.locations.length} countries/states\` and \`${getNumberOfCities(readConfigResponseModel)} cities\`. \n`;
        markdown = markdown + `To get into the list you need to have minimum number of followers that varies in each country. `;
        markdown = markdown + `The list can be found in [config.json](https://github.com/${githubUsernameAndRepository}/blob/main/config.json).\n\n`;
        markdown = markdown + `The project maintained by [gayanvoice](https://github.com/gayanvoice). `
        markdown = markdown + `Don't forget to follow him on [GitHub](https://github.com/gayanvoice), [Twitter](https://twitter.com/gayanvoice), and [Medium](https://gayanvoice.medium.com/).\n\n`;
        markdown = markdown + `### 🚀 Share on\n\n`;
        markdown = markdown + socialMediaComponent.create(
            "Top GitHub Users By Country",
            "List of most active github users based on public contributions, and number of followers by country or state",
            `https://github.com/${githubUsernameAndRepository}`);
        markdown = markdown + createListOfCountriesAndCitiesTable(
            `https://github.com/${githubUsernameAndRepository}`,
            readConfigResponseModel);
        markdown = markdown + `### 🚀 Share on\n\n`;
        markdown = markdown + socialMediaComponent.create(
            "Top GitHub Users By Country",
            "List of most active github users based on public contributions, and number of followers by country or state",
            `https://github.com/${githubUsernameAndRepository}`);
        markdown = markdown + thirdPartyComponent.create();
        markdown = markdown + licenseComponent.create(githubUsernameAndRepository);
        return markdown;
    }
    return {
        create: create,
    };
})();
module.exports = createIndexPage;