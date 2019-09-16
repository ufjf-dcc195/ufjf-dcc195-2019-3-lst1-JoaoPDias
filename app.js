const server = require ('./modules/server');
const route = require('./modules/router');
const controllers = require('./modules/controllers');

var handlers;
handlers = {};
handlers["/"] = controllers.index;
handlers["/index.html"] = controllers.index;
handlers["/sobre.html"] = controllers.sobre;
handlers["/aleatorios.html"] = controllers.aleatorio;
handlers["/primos.html"] = controllers.primos;
handlers["/equacao.html"] = controllers.equacao;
handlers["404"] = controllers.notfound;
handlers["/xadrez.html"] = controllers.sobre;
handlers["/xadrez.json"] = controllers.sobre;

server.start(route.route,handlers);