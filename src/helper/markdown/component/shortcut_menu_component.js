const formatMarkdown = require('../format_markdown');
let shortcutMenuComponent = function () {
    let create = function (indexUrl, country, index) {
        let publicContributionsUrl  = `${indexUrl}/blob/main/markdown/public_contributions/${formatMarkdown.getCountryName(country)}.md`;
        let totalContributionsUrl  = `${indexUrl}/blob/main/markdown/total_contributions/${formatMarkdown.getCountryName(country)}.md`;
        let followersUrl  = `${indexUrl}/blob/main/markdown/followers/${formatMarkdown.getCountryName(country)}.md`;
        let table = `<table>\n`;
        table = table + `\t<tr>\n`;
        if(index === 0){
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<strong>Top Users By Public Contributions</strong>\n`;
            table = table + `\t\t</td>\n`;
        } else {
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<a href="${publicContributionsUrl}">Top Users By Public Contributions</a>\n`;
            table = table + `\t\t</td>\n`;
        }
        if(index === 1){
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<strong>Top Users By Total Contributions</strong>\n`;
            table = table + `\t\t</td>\n`;
        } else {
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<a href="${totalContributionsUrl}">Top Users By Total Contributions</a>\n`;
            table = table + `\t\t</td>\n`;
        }
        if(index === 2){
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<strong>Top Users By Followers</strong>\n`;
            table = table + `\t\t</td>\n`;
        } else {
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<a href="${followersUrl}">Top Users By Followers</a>\n`;
            table = table + `\t\t</td>\n`;
        }
        table = table + `\t</tr>\n`;
        table = table + `</table>\n\n`;
        return table;
    }
    return {
        create: create,
    };
}();
module.exports = shortcutMenuComponent;
