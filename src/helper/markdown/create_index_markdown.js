const formatMarkdown = require('./format_markdown');
let createIndexMarkdown = (function () {
    let createListOfCities = function (locationDataModel) {
        let cities = ``;
        for(const location of locationDataModel.locations) {
            if(locationDataModel.country !== location) {
                cities = cities + `\t\t\t<code>${formatMarkdown.capitalizeTheFirstLetterOfEachWord(location)}</code> \n`;
            }
        }
        return cities;
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
    let createSocialMediaTable = function (title, description, url) {
        let facebookPost = `sharer.php?t=${title}&u=${url}&_rdc=1&_rdr`;
        let facebookMessengerPost = `send?link=${url}&app_id=291494419107518&redirect_uri=${url}`;
        let twitterPost = `tweet?text=${title}&url=${url}`;
        let whatsAppPost = `send?text=${title} ${url}`;
        let telegramPost = `url?url=${url}&text=${title}`;
        let linkedInPost = `shareArticle?title=${title}&url=${url}`;
        let vkontaktePost = `share.php?url=${url}`;
        let bloggerPost = `blog-this.g?n=${desription}&t=${title}&u=${url}`;
        let wordpressPost = `press-this.php?u=${url}&t=${title}&s=${description}&i=`;
        let email = `name?cc=cc&bcc=bcc&subject=${title}&body=${description}-${url}`;
        let redditPost = `submit?title=${title}&url=${url}`;
        let socialMediaArray = [
            {
                site: `Facebook`,
                shareUrl: `https://web.facebook.com/${facebookPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/images/icons/facebook.svg`,
            },
            {
                site: `Facebook Messenger`,
                shareUrl: `https://www.facebook.com/dialog/${facebookMessengerPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/images/icons/facebook_messenger.svg`,
            },
            {
                site: `Twitter`,
                shareUrl: `https://twitter.com/intent/${twitterPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/images/icons/twitter.svg`
            },
            {
                site: `WhatsApp`,
                shareUrl: `https://web.whatsapp.com/${whatsAppPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/whatsapp.svg`
            },
            {
                site: `Telegram`,
                shareUrl: `https://t.me/share/${telegramPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/telegram.svg`
            },
            {
                site: `LinkedIn`,
                shareUrl: `https://www.linkedin.com/${linkedInPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/linkedin.svg`
            },
            {
                site: `Vkontakte`,
                shareUrl: `https://vk.com/${vkontaktePost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/vkontakte.svg`,
            },
            {
                site: `Blogger`,
                shareUrl: `https://www.blogger.com/${bloggerPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/blogger.svg`,
            },
            {
                site: `Wordpress`,
                shareUrl: `https://wordpress.com/wp-admin/${wordpressPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/wordpress.svg`,
            },
            {
                site: `Email`,
                shareUrl: `mailto:recipient ${email}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/gmail.svg`
            },
            {
                site: `Reddit`,
                shareUrl: `https://www.reddit.com/${redditPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/images/icons/reddit.svg`,
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
        table = table + `</table>\n\n`;
        return table;
    }

    let create = function (GITHUB_REPOSITORY, readConfigResponseModel) {
        let indexUrl  = `https://github.com/${GITHUB_REPOSITORY}`
        // let publicContributionsUrl  = `${indexUrl}/blob/main/markdown/public_contributions/${formatMarkdown.getCountryName(locationDataModel.country)}.md`;
        // let totalContributionsUrl  = `${indexUrl}/blob/main/markdown/total_contributions/${formatMarkdown.getCountryName(locationDataModel.country)}.md`;
        let markdown = `# 🔝 Top GitHub Users By Country\n\n`;
        markdown = markdown + `<img align="right" width="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/800px-Flag_of_Sri_Lanka.svg.png" alt="Sri Lanka">\n\n`;
        markdown = markdown + `List of most active GitHub users based on public contributions, and number of followers  by country or state. `;
        markdown = markdown + `The list updated \`${formatMarkdown.getDate()}\`.\n\n`;
        markdown = markdown + `This repository contains users \`12 countries\` and \`300 cities\`. \n`;
        markdown = markdown + `To get into the list you need to have minimum number of followers that varies in each country. `;
        markdown = markdown + `The list can be found in [config.json](https://github.com/github-commits-top).\n\n`;
        markdown = markdown + `The project maintained by [gayanvoice](github.com). `
        markdown = markdown + `Don't forget to follow him on [GitHub](github.com), [Twitter](twitter.com), and [Medium](medium.com).\n\n`;
        markdown = markdown + `### 🚀 Share on\n\n`;
        markdown = markdown + createSocialMediaTable(
            encodeURI("Top GitHub Users By Country"),
            encodeURI("List of most active github users based on public contributions, and number of followers by country or state"),
            encodeURI(indexUrl));
        markdown = markdown + createListOfCountriesAndCitiesTable(indexUrl, readConfigResponseModel);
        markdown = markdown + `### 🚀 Share on\n\n`;
        markdown = markdown + createSocialMediaTable(
            encodeURI("Top GitHub Users By Country"),
            encodeURI("List of most active github users based on public contributions, and number of followers by country or state"),
            encodeURI(indexUrl));
        markdown = markdown + `## 📦 Third party\n\n`;
        markdown = markdown + `- [@octokit/graphql](https://www.npmjs.com/package/@octokit/graphql) - Send GraphQL requests to GitHub API.\n`;
        markdown = markdown + `- [fs-extra](https://www.npmjs.com/package/fs-extra) - Creating directories and files.\n`
        markdown = markdown + `- [simple-git](https://www.npmjs.com/package/simple-git) - Handling Git commands.\n`
        markdown = markdown + `## 📄 License\n\n`;
        markdown = markdown + `- Repository: [gayanvoice/top-github-users-monitor](https://github.com/gayanvoice/top-github-users-monitor)\n`;
        markdown = markdown + `- Template - [gayanvoice/${GITHUB_REPOSITORY}](${indexUrl})\n`;
        markdown = markdown + `- Code: [MIT](./LICENSE) © [Gayan Kuruppu](https://github.com/gayanvoice)\n`;
        return markdown;
    }
    return {
        create: create,
    };
})();
module.exports = createIndexMarkdown;
