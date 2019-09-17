exports.jogada = (l, c) => {
    var tabuleiro = `<table id="tabuleiro" class="text-center">`;
    for (let i = 1; i < 9; i++) {
        tabuleiro += '<tr>';
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 === 0) {
                if (i === l && j === c) {
                    tabuleiro += '<td class="vermelho">&#9816;</td>'
                } else if (possibilidade(l, c, i, j)) {
                    tabuleiro += '<td class="vermelho ps"></td>'
                } else {
                    tabuleiro += '<td class="vermelho"></td>'
                }
            } else {
                if (i === l && j === c) {
                    tabuleiro += '<td class="branco" >&#9822;</td>'
                } else if (possibilidade(l, c, i, j)) {
                    tabuleiro += '<td class=" branco ps"></td>'
                } else {
                    tabuleiro += '<td class="branco" ></td>'
                }
            }

        }
        tabuleiro += '</tr>';
    }
    tabuleiro += '</table>';
    return tabuleiro;
};
exports.tabuleiroPadrao = () => {
    var tabuleiro = `<table id="tabuleiro" class="text-center">`;
    for (let i = 1; i < 9; i++) {
        tabuleiro += '<tr>';
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 === 0) {
                tabuleiro += '<td class="vermelho"></td>'
            }
            else {
                tabuleiro += '<td class="branco" ></td>'
            }

        }
        tabuleiro += '</tr>';
    }
    tabuleiro += '</table>';
    return tabuleiro;
};


function possibilidade(l, c, i, j) {
    return ((c + 2 === j && (l + 1 === i || l - 1 === i))
        || (c - 2 === j && (l + 1 === i || l - 1 === i))
        || (l + 2 === i && (c + 1 === j || c - 1 === j))
        || (l - 2 === i && (c + 1 === j || c - 1 === j)));
}

exports.jogadaJSON = (l, c) => {
    var tabuleiro = [];
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
                if (i === l && j === c) {
                    tabuleiro.push({'Casa':  i + ' ' + j + ' Cavalo'});
                } else if (possibilidade(l, c, i, j)) {
                    tabuleiro.push({'Casa ':  i + ' ' + j + ' Possibilidade'});
                } else {
                    tabuleiro.push({'Casa ':  i + ' ' + j});
            }

        }
    }
    return tabuleiro;
};


