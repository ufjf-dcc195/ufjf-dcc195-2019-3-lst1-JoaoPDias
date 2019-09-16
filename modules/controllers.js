var fs = require('fs');
exports.sobre = function (req, res) {
    fs.readFile('./views/sobre.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

    })
};

exports.aleatorio = function (req, res) {
    fs.readFile('./views/aleatorios.html', function (err, html) {
        if (err) {
            throw err;
        }
        let array_pares = [];
        let array_impares = [];
        for (let i = 0; i < 100; i++) {
            let num = Math.floor(Math.random() * 100);
            num % 2 === 0 ? array_pares.push(num) : array_impares.push(num)
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html.toString().replace('{{pares_array}}', JSON.stringify(array_pares)).replace('{{impares_array}}', JSON.stringify(array_impares)));
        res.end();

    })
};


exports.primos = function (req, res) {
    let url = require('url');
    let valores = url.parse(req.url, true).query;
    if (valores.valor1&&valores.valor2) {
        fs.readFile('./views/primos.html', function (err, html) {
            if (err) {
                throw err;
            }

            let valor1 = valores.valor1;
            let valor2 = valores.valor2;
            let primos = [];
            if (valor1 < valor2 && valor2 < 100) {
                for (let i = valor1; i < valor2; i++) {
                    ehPrimo(i) ? primos.push(i) : ''
                }

                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(html.toString().replace('{{primos}}', '<h3>Resultado</h3><p style="word-break: break-all;">' + JSON.stringify(primos) + '</p>'));
                res.end();
            }else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(html.toString().replace('{{primos}}', '<h3>Valores fornecidos são inválidos</h3>'));
                res.end();
            }
        })
    } else {
        fs.readFile('./views/primos.html', function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(html.toString().replace('{{primos}}', ''));
            res.end();

        })
    }
};
exports.equacao = function (req, res) {
    let url = require('url');
    let valores = url.parse(req.url, true).query;
    if (valores.valorA&&valores.valorB&&valores.ValorC) {
        fs.readFile('./views/primos.html', function (err, html) {
            if (err) {
                throw err;
            }

            let valor1 = valores.valor1;
            let valor2 = valores.valor2;
            let primos = [];
            if (valor1 < valor2 && valor2 < 100) {
                for (let i = valor1; i < valor2; i++) {
                    ehPrimo(i) ? primos.push(i) : ''
                }

                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(html.toString().replace('{{primos}}', '<h3>Resultado</h3><p style="word-break: break-all;">' + JSON.stringify(primos) + '</p>'));
                res.end();
            }else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(html.toString().replace('{{primos}}', '<h3>Valores fornecidos são inválidos</h3>'));
                res.end();
            }
        })
    } else {
        fs.readFile('./views/equacao.html', function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(html.toString().replace('{{equacao}}', ''));
            res.end();

        })
    }
};
exports.index = function (req, res) {
    fs.readFile('./views/index.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

    })
};

exports.notfound = function (req, res) {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.write('<h1>NAO ENCONTROU, ARROMBADO!</h1>');
    res.end();
};

exports.ls = function (req, res) {
    const exec = require("child_process").exec;
    console.log("Handler: lista!");
    var resposta = "vazia";
    exec("dir /w", function (error, stdout, stderr) {
        resposta = stdout;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.write(resposta, "utf8");
        res.end();
    });

};

function getRandom() {
    return Math.random();
}

function ehPrimo(numero) {
    if (numero !== 1) {
        for (let i = 2; i < numero; i++) {
            if (numero % i === 0) return false
        }
        return true
    }
    return false
}



