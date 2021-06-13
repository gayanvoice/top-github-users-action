let createHtmlFile = (function () {
    let create = function () {
        let html = `<!DOCTYPE html>\n`;
        html = html + `<html>\n`;
        html = html + `\t<head>\n`;
        html = html + `\t\t<title>Total Public Contributions in GitHub by Country</title>\n`;
        html = html + `\t\t<link rel="stylesheet" href="./css/styles.css">\n`;
        html = html + `\t\t<script src="./javascript/chart.min.js"></script>\n`;
        html = html + `\t\t<script src="./javascript/index.umd.min.js"></script>\n`;
        html = html + `\t\t<script src="./javascript/graph.js"></script>\n`;
        html = html + `\t\t<script src="./javascript/resizeCanvas.js"></script>\n`;
        html = html + `\t</head>\n`;
        html = html + `\t<body>\n`;
        html = html + `\t<div class="header">\n`;
        html = html + `\t\t<div class="description">\n`;
        html = html + `\t\t\t<strong>Total Public Contributions in GitHub by Country</strong>\n`;
        html = html + `\t\t</div>\n`;
        html = html + `\t</div>\n`;
        html = html + `\t<div class="canvas">\n`;
        html = html + `\t\t<canvas id="canvas"></canvas>\n`;
        html = html + `\t</div>\n`;
        html = html + `\t<div class="footer">\n`;
        html = html + `\t\t<div class="description">\n`;
        html = html + `\t\t\tList of most active GitHub users based on public contributions by country.\n`;
        html = html + `\t\t\tGo to repository <a href="https://github.com/gayanvoice/top-github-users">gayanvoice/top-github-users</a>\n`;
        html = html + `\t\t</div>\n`;
        html = html + `\t</div>\n`;
        html = html + `\t<script type="application/javascript">\n`;
        html = html + `\t\tresizeCanvas()\n`;
        html = html + `\t</script>\n`;
        html = html + `\t</body>\n`;
        html = html + `</html>`
        return html;
    }
    return {
        create: create,
    };
})();
module.exports = createHtmlFile;