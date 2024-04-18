
const url = require('url');

const authenticateWs = async (req, socket, callback) => {

    const { pathname, query } = url.parse(req.url, true);
    const name = query.name;
    console.log(query)
    callback(true);
}

module.exports = authenticateWs;