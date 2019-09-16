let http = require("http");
let url = require("url");
const port = process.env.PORT || 5000
function start(route,routes) {
    let server = http.createServer(function (req,res) {
        route(url.parse(req.url).pathname,routes,req,res);
    });
    server.listen(port);
    console.log(`Listening on ${ port }`);
}
exports.start = start;