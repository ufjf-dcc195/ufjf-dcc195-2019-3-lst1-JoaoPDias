let http = require("http");
let url = require("url");
function start(route,routes) {
    let server = http.createServer(function (req,res) {
        route(url.parse(req.url).pathname,routes,req,res);
    });
    server.listen(process.env.PORT || 3000 ,function(){
        console.log("up and running on port "+process.env.PORT);
    })
}
exports.start = start;