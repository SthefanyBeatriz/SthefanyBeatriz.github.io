var valorAtual = '0';
var ultimoValor = '0';
var operacao = undefined;
var bNovoValor = false;

const operacoes = ['+', '-', '*', '/'];
const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function atualizarDisplay() {
    document.getElementById('display').value = valorAtual;
}

function onClick_numero(num) {
    num = String(num);
    if (num == '0' && valorAtual == '0') {
        return;
    }
    else if (num == '0' && valorAtual == '-0') {
        return;
    }
    else if (valorAtual == '0' || bNovoValor == true) {
        valorAtual = num;
        bNovoValor = false;
    }
    else if (valorAtual == '-0' || bNovoValor == true) {
        valorAtual = -num;
        bNovoValor = false;
    }
    else {
        valorAtual = valorAtual + num;
    }
    atualizarDisplay();
}

function limparTudo() {
    valorAtual = '0';
    ultimoValor = '0';
    operacao = undefined;
    bNovoValor = false;

    atualizarDisplay();
}
function limparUltimoDigito() {
    const bNegativo = Number(valorAtual.replace(',', '.')) < 0;

    if (bNegativo) {
        valorAtual = String(Number(valorAtual.replace(',', '.')) * -1).replace('.', ',');
    }

    if (valorAtual.length > 1) {
        valorAtual = valorAtual.slice(0, -1);
    }
    else if (valorAtual.length == 1) {
        valorAtual = '0';
    }

    if (bNegativo) {
        valorAtual = String(Number(valorAtual.replace(',', '.')) * -1).replace('.', ',');
    }

    atualizarDisplay();
}
function onClick_virgula() {
    if (valorAtual.includes(',') == false) {
        valorAtual = valorAtual + ',';
        bNovoValor = false;
        atualizarDisplay();
    }
}
function definirOperacao(novaOperacao) {
    if (operacoes.includes(novaOperacao) == false) {
        return;
    }

    onClick_igual();
    ultimoValor = valorAtual;
    operacao = novaOperacao;
    bNovoValor = true;
}
function onClick_igual() {
    if (operacao == '+') {
        valorAtual = String(Number(ultimoValor.replace(',', '.')) + Number(valorAtual.replace(',', '.'))).replace('.', ',');
    }
    if (operacao == '-') {
        valorAtual = String(Number(ultimoValor.replace(',', '.')) - Number(valorAtual.replace(',', '.'))).replace('.', ',');
    }
    if (operacao == '*') {
        valorAtual = String(Number(ultimoValor.replace(',', '.')) * Number(valorAtual.replace(',', '.'))).replace('.', ',');
    }
    if (operacao == '/') {
        if (Number(valorAtual.replace(',', '.')) == 0) {
            valorAtual = '0';
        }
        else {
            valorAtual = String(Number(ultimoValor.replace(',', '.')) / Number(valorAtual.replace(',', '.'))).replace('.', ',');
        }
    }
    ultimoValor = '0';
    operacao = undefined;
    atualizarDisplay();
}
function onClick_porcentagem() {
    valorAtual = String(Number(valorAtual.replace(',', '.')) / 100).replace('.', ',');
    atualizarDisplay();
}
function onClick_inverterSinal() {
    if (valorAtual[0] == '-') {
        valorAtual = valorAtual.slice(1);
    }
    else {
        valorAtual = '-' + valorAtual;
    }
    atualizarDisplay();
}

document.addEventListener('keydown', (e) => {
    if (numeros.includes(e.key)) {
        onClick_numero(e.key);
    }
    else if (e.key == 'Escape') {
        limparTudo();
    }
    else if (e.key == 'Backspace') {
        limparUltimoDigito();
    }
    else if (operacoes.includes(e.key)) {
        definirOperacao(e.key);
    }
    else if (e.key == '%') {
        onClick_porcentagem();
    }
    else if (e.key == 'Enter') {
        onClick_igual();
    }
    else if (e.key == '.' || e.key == ',') {
        onClick_virgula();
    }
});

document.addEventListener('mousedown', (e) => {
    e.preventDefault();
});

atualizarDisplay();