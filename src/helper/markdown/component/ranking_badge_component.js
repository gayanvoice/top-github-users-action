const formatMarkdown = require('../format_markdown');

let rankingBadgeComponent = (function () {
    const rankingRepositoryUrl = `https://github.com/gayanvoice/top-github-users-ranking`;

    let getCountryRankingUrl = function (country) {
        return `${rankingRepositoryUrl}/blob/main/markdown/${formatMarkdown.getCountryName(country)}.md`;
    }

    let getUserRankingUrl = function (country, username) {
        return `${getCountryRankingUrl(country)}#${username}`;
    }

    let createRepositoryParagraph = function () {
        return `Want to display your GitHub country ranking on your profile or README? ` +
            `Visit [gayanvoice/top-github-users-ranking](${rankingRepositoryUrl}) to browse generated ranking badges. ` +
            `Each ranked user has a ready-to-copy Markdown badge snippet that can be added directly to a GitHub profile, repository README, or other Markdown page.\n\n`;
    }

    let createCountryParagraph = function (country) {
        let countryName = formatMarkdown.capitalizeTheFirstLetterOfEachWord(country);
        return `🏅 Looking for a shareable ranking badge? Visit the [${countryName} GitHub user ranking page](${getCountryRankingUrl(country)}) ` +
            `to view the country rankings and copy the ready-made badge snippet for your GitHub profile or README.\n\n`;
    }

    let createUserCopyLink = function (country, username) {
        return `<a href="${getUserRankingUrl(country, username)}">Copy rank badge</a>`;
    }

    return {
        createRepositoryParagraph: createRepositoryParagraph,
        createCountryParagraph: createCountryParagraph,
        createUserCopyLink: createUserCopyLink,
        getCountryRankingUrl: getCountryRankingUrl,
        getUserRankingUrl: getUserRankingUrl,
    };
})();

module.exports = rankingBadgeComponent;
