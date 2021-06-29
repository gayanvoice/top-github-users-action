let starComponent = function () {
    let create = function () {
        let table = `<table>\n`;
        table = table + `\t<tr>\n`;
        table = table + `\t\t<td>\n`;
        table = table + `\t\t\tDon't forget to star ⭐ this repository\n`
        table = table + `\t\t</td>\n`;
        table = table + `\t</tr>\n`;
        table = table + `</table>\n\n`;
        return table;
    }
    return {
        create: create,
    };
}();
module.exports = starComponent;