const formatMarkdown = require('./format_markdown');
let createIndexMarkdown = (function () {
    let createTable = function (readCacheResponseModel) {
        let users = readCacheResponseModel.users;
        let index = 1;
        users.sort((a, b) => parseFloat(b.followers) - parseFloat(a.followers));
        let row = `<table>\n`;
        row = row + `\t<tr>\n`;
        row = row + `\t\t<th>#</th>\n`;
        row = row + `\t\t<th>Name</th>\n`;
        row = row + `\t\t<th>Company</th>\n`;
        row = row + `\t\t<th>Twitter Username</th>\n`;
        row = row + `\t\t<th>Location</th>\n`;
        row = row + `\t\t<th>Followers</th>\n`;
        row = row + `\t</tr>\n`;
        for (const user of readCacheResponseModel.users) {
            if(user.publicContributions > 0){
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
                row = row + `\t\t<td>${user.followers}</td>\n`;
                row = row + `\t</tr>\n`;
            }
            index++;
        }
        row = row + `</table>\n`;
        return row;
    }
    let saveIndex = async function (readConfigResponseModel) {
        for await(const locationDataModel of readConfigResponseModel.locations){
            console.log(locationDataModel.country)
            let readCacheResponseModel =  await outputCache.readCacheFile(locationDataModel.country);
            if(readCacheResponseModel.status) {
                let maxUserByPublicContributions = readCacheResponseModel.users.sort((a, b) => parseFloat(b.publicContributions) - parseFloat(a.publicContributions))[0];
                let maxUserByTotalContributions = readCacheResponseModel.users.sort((a, b) => parseFloat(b.publicContributions) - parseFloat(a.publicContributions))[0];
                console.log(maxUserByPublicContributions)
            }
        }
    }
    let createSocialMediaTable = function (title, description, url) {
        let facebookPost = `sharer.php?u=${url}`;
        let tweet = `tweet?text=${title} ${url}`;
        let linkedInPost = `shareArticle?mini=true&url=${url}&title=${title}&summary=${description}&source=`;
        let email = `name?cc=cc&bcc=bcc&subject=subject&body=body`;
        let redditPost = `submit?url=[post-url]&title=[post-title]`;
        let tumblrPost = `link?url=[post-url]&name=[post-title]&description=[post-desc]`;
        let socialMediaArray = [
            {
                site: `Facebook`,
                shareUrl: `https://www.facebook.com/sharer/${facebookPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/images/icons/facebook.svg`,
            },
            {
                site: `Facebook Messenger`,
                shareUrl: `https://www.facebook.com/sharer/${facebookPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/images/icons/facebook_messenger.svg`,
            },
            {
                site: `Twitter`,
                shareUrl: `https://twitter.com/intent/${tweet}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/images/icons/twitter.svg`
            },
            {
                site: `WhatsApp`,
                shareUrl: `https://www.linkedin.com/${linkedInPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/whatsapp.svg`
            },
            {
                site: `Telegram`,
                shareUrl: `https://www.linkedin.com/${linkedInPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/telegram.svg`
            },
            {
                site: `Viber`,
                shareUrl: `https://www.linkedin.com/${linkedInPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/viber.svg`
            },
            {
                site: `LinkedIn`,
                shareUrl: `https://www.linkedin.com/${linkedInPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/linkedin.svg`
            },
            {
                site: `Email`,
                shareUrl: `mailto:receipient ${email}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/gmail.svg`
            },
            {
                site: `Reddit`,
                shareUrl: `https://reddit.com/${redditPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/reddit.svg`,
            },
            {
                site: `Tumblr`,
                shareUrl: `https://www.tumblr.com/share/${tumblrPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/tumblr.svg`,
            }
        ];
        let table = `<table>\n`;
        table = table + `\t<tr>\n`;
        for(const socialMedia of socialMediaArray){
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<a href="${socialMedia.shareUrl}">\n`
            table = table + `\t\t\t\t<img src="${socialMedia.iconUrl}" height="48" width="48" alt="${socialMedia.site}"/>\n`
            table = table + `\t\t\t</a>\n`;
            table = table + `\t\t</td>\n`;
        }
        table = table + `\t</tr>\n`;
        table = table + `</table>\n`;
        return table;
    }

    let create = function (GITHUB_REPOSITORY, readConfigResponseModel) {
        let indexUrl  = `https://github.com/${GITHUB_REPOSITORY}`
        // let publicContributionsUrl  = `${indexUrl}/blob/main/markdown/public_contributions/${formatMarkdown.getCountryName(locationDataModel.country)}.md`;
        // let totalContributionsUrl  = `${indexUrl}/blob/main/markdown/total_contributions/${formatMarkdown.getCountryName(locationDataModel.country)}.md`;
        let markdown = `# Top GitHub Users By Country\n\n`;
        markdown = markdown + `<img align="right" width="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/800px-Flag_of_Sri_Lanka.svg.png" alt="Sri Lanka">\n\n`;
        markdown = markdown + `List of most active github users based on public contributions, and number of followers  by country or state. `;
        markdown = markdown + `The list updated \`${formatMarkdown.getDate()}\`.\n\n`;
        markdown = markdown + `This repository contains users \`12 countries\` and \`300 cities\`. \n`;
        markdown = markdown + `To get into the list you need to have minimum number of followers that varies in each country. `;
        markdown = markdown + `The list can be found in [config.json](https://github.com/github-commits-top).\n\n`;
        markdown = markdown + `The project is maintained by [gayanvoice](github.com). `
        markdown = markdown + `Don't forget to follow him on [GitHub](github.com), [Twitter](twitter.com), and [Medium](medium.com).\n\n`;
        markdown = markdown + `${createSocialMediaTable("Some Title", "Some Description", indexUrl)}\n\n`;
        return markdown;
    }
    return {
        create: create,
    };
})();
module.exports = createIndexMarkdown;
