const fs = require('fs');
const qs = require("querystring");
const tabuleiro = require('./tabuleiro')
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
    if (valores.valor1 && valores.valor2) {
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
            } else {
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
    if (req.method === 'POST') {
        let body = ''
        req.on('data', function (data) {
            body += data
        })
        req.on('end', function () {
            fs.readFile('./views/equacao.html', function (err, html) {
                if (err) {
                    throw err;
                }
                let valores = qs.parse(body);
                let valorA = valores.A;
                let valorB = valores.B;
                let valorC = valores.C;
                if (valorA > 0) {
                    let delta = (valorB * valorB) - (4 * valorA * valorC)
                    if (delta >= 0) {
                        let raizDelta = Math.sqrt(delta)
                        let x1 = (-valorB + raizDelta) / (2 * valorA)
                        let x2 = (-valorB - raizDelta) / (2 * valorA)
                        res.writeHead(200, {"Content-Type": "text/html"});
                        res.write(html.toString().replace('{{equacao}}',
                            `<h3>Resultado</h3>
                        <p>Valor da Primeira Raíz =  ${x1.toFixed(1)} </p>
                        <p>Valor da Segunda Raíz = ${x2.toFixed(1)} </p><br/>`));
                        res.end();
                    } else {
                        res.writeHead(200, {"Content-Type": "text/html"});
                        res.write(html.toString().replace('{{equacao}}', '<h3>A equação não possui raízes reais</h3>'));
                        res.end();
                    }
                } else {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(html.toString().replace('{{equacao}}', '<h3>Valores fornecidos são inválidos</h3>'));
                    res.end();
                }
            })
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

exports.xadrez = function (req, res) {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data
        });
        req.on('end', function () {
            fs.readFile('./views/xadrez.html', function (err, html) {
                if (err) {
                    throw err;
                }
                let valores = qs.parse(body);
                let linha = parseInt(valores.linha);
                let coluna = parseInt(valores.coluna);
                if (linha > 0 && coluna > 0) {
                    let novoTabuleiro = tabuleiro.jogada(linha, coluna);
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(html.toString().replace('{{tabuleiro}}', novoTabuleiro));
                    res.end();
                } else {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(html.toString().replace('{{tabuleiro}}', '<h3>Dados Inválidos</h3>'));
                    res.end();
                }
            })
        })
    } else {
        fs.readFile('./views/xadrez.html', function (err, html) {
            if (err) {
                throw err;
            }
            let tabuleiroPadrao = tabuleiro.tabuleiroPadrao();
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(html.toString().replace('{{tabuleiro}}', tabuleiroPadrao));
            res.end();

        })
    }
}
;

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


