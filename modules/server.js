let http = require("http");
let url = require("url");
function start(route,routes) {
    let server = http.createServer(function (req,res) {
        route(url.parse(req.url).pathname,routes,req,res);
    });
    server.listen(8891);
    console.log("Servidor iniciado em localhost:8890");
}
exports.start = start;