let headerComponent = function () {
    let create = function (pageTitle, country) {
        let markdown = ``;
        if(pageTitle === undefined && country === undefined){
            markdown = markdown + `# Top GitHub Users By Country `;
            markdown = markdown + `[<img alt="Image of insights" src="https://github.com/gayanvoice/insights/blob/master/graph/373383893/small/year.png" height="24">](https://github.com/gayanvoice/insights/blob/master/readme/373383893/year.md)\n`
            markdown = markdown + `[![Image of insights](https://github.com/gayanvoice/insights/blob/master/svg/373383893/badge.svg)](https://github.com/gayanvoice/insights/blob/master/readme/373383893/year.md)\n\n`;
        } else {
            markdown = markdown + `# Top GitHub Users By ${pageTitle} in ${country} `;
            markdown = markdown + `[<img alt="Image of insights" src="https://github.com/gayanvoice/insights/blob/master/graph/373383893/small/year.png" height="24">](https://github.com/gayanvoice/insights/blob/master/readme/373383893/year.md)\n`
            markdown = markdown + `[![Image of insights](https://github.com/gayanvoice/insights/blob/master/svg/373383893/badge.svg)](https://github.com/gayanvoice/insights/blob/master/readme/373383893/year.md)\n\n`;
        }
        return markdown;
    }
    return {
        create: create,
    };
}();
module.exports = headerComponent;