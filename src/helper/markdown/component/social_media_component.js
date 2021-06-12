const formatMarkdown = require('../format_markdown');
let socialMediaComponent = (function () {
    let createSocialMediaTable = function (title, description, url) {
        let facebookPost = `sharer.php?t=${title}&u=${url}&_rdc=1&_rdr`;
        let facebookMessengerPost = `send?link=${url}&app_id=291494419107518&redirect_uri=${url}`;
        let twitterPost = `tweet?text=${title}&url=${url}`;
        let whatsAppPost = `send?text=${title} ${url}`;
        let telegramPost = `url?url=${url}&text=${title}`;
        let linkedInPost = `shareArticle?title=${title}&url=${url}`;
        let vkontaktePost = `share.php?url=${url}`;
        let bloggerPost = `blog-this.g?n=${description}&t=${title}&u=${url}`;
        let wordpressPost = `press-this.php?u=${url}&t=${title}&s=${description}&i=`;
        let email = `name?cc=cc&bcc=bcc&subject=${title}&body=${description}-${url}`;
        let redditPost = `submit?title=${title}&url=${url}`;
        let socialMediaArray = [
            {
                site: `Facebook`,
                shareUrl: `https://web.facebook.com/${facebookPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/public/images/icons/facebook.svg`,
            },
            {
                site: `Facebook Messenger`,
                shareUrl: `https://www.facebook.com/dialog/${facebookMessengerPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/public/images/icons/facebook_messenger.svg`,
            },
            {
                site: `Twitter`,
                shareUrl: `https://twitter.com/intent/${twitterPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/raw/master/public/images/icons/twitter.svg`
            },
            {
                site: `WhatsApp`,
                shareUrl: `https://web.whatsapp.com/${whatsAppPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/whatsapp.svg`
            },
            {
                site: `Telegram`,
                shareUrl: `https://t.me/share/${telegramPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/telegram.svg`
            },
            {
                site: `LinkedIn`,
                shareUrl: `https://www.linkedin.com/${linkedInPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/linkedin.svg`
            },
            {
                site: `Vkontakte`,
                shareUrl: `https://vk.com/${vkontaktePost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/vkontakte.svg`,
            },
            {
                site: `Blogger`,
                shareUrl: `https://www.blogger.com/${bloggerPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/blogger.svg`,
            },
            {
                site: `Wordpress`,
                shareUrl: `https://wordpress.com/wp-admin/${wordpressPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/wordpress.svg`,
            },
            {
                site: `Email`,
                shareUrl: `mailto:recipient ${email}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/gmail.svg`
            },
            {
                site: `Reddit`,
                shareUrl: `https://www.reddit.com/${redditPost}`,
                iconUrl: `https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/reddit.svg`,
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
    let create = function (title, description, url) {
        return createSocialMediaTable(
            encodeURI(title),
            encodeURI(description),
            encodeURI(url));
    }
    return {
        create: create,
    };
})();
module.exports = socialMediaComponent;
