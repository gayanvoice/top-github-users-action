const OctokitPageInfoModel = require('./OctokitPageInfoModel');
const OctokitNodeModel = require('./OctokitNodeModel');
let OctokitResponseModel =  function (status, response) {
    let setNodes = function (edges) {
        let array = [];
        for (const node of edges) {
            if(node.node.__typename === 'User'){
                array.push(new OctokitNodeModel(node.node));
            }
        }
        return array;
    }
    this.status = status;
    if (status) this.node = setNodes(response.search.edges);
    if (status) this.pageInfo = new OctokitPageInfoModel(response.search.pageInfo);
}
module.exports = OctokitResponseModel;