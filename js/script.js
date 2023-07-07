//DISPLAY e BOTÕES
const tela_op_anterior = document.querySelector('.operacaoanterior');
const tela_op_atual = document.querySelector('.operacaoatual');
const botoes = document.querySelectorAll('button');
let num1 = '';
let num2 = '';
let operacao = '';

// // FUNÇÕES DO DISPLAY
function adicionarDigito(digito) {
    if (digito === ','
        &&
        tela_op_atual.innerText.includes('.')) return

    tela_op_atual.innerText += digito;
}

function removerDigito() {
    tela_op_atual.innerHTML = tela_op_atual.innerHTML.slice(0, -1);
    if (tela_op_atual.innerHTML == '' && tela_op_anterior.innerHTML) {
        tela_op_atual.innerHTML = tela_op_anterior.innerHTML;
        tela_op_anterior.innerHTML = '';
    }
}

function limparTela() {
    tela_op_atual.innerText = '';
}

function zerarCalculadora() {
    tela_op_atual.innerText = '';
    tela_op_anterior.innerText = '';
}

function zerarVisor(resultado) {
    tela_op_atual.innerHTML = resultado;
    tela_op_anterior.innerHTML = tela_op_atual.innerHTML;
    tela_op_atual.innerHTML = '';
}

// // FUNÇÕES DE OPERAÇÕES
function somar(num1, num2) {
    let soma = num1 + num2;
    zerarVisor(soma);
}

function multiplicar(num1, num2) {
    let multiplicacao = num1 * num2;
    zerarVisor(multiplicacao);
}

function dividir(num1, num2) {
    let divisao = num1 / num2;
    zerarVisor(divisao);
}

function subtrair(num1, num2) {
    let subtracao = num1 - num2;
    zerarVisor(subtracao);
}

function fazerOperacao() {
    if (tela_op_anterior.innerHTML && tela_op_atual.innerHTML) {
        switch (operacao) {
            case '+':
                somar(num1, num2);
                break;
            case '-':
                subtrair(num1, num2);
                break;
            case 'x':
                multiplicar(num1, num2);
                break;
            case '/':
                dividir(num1, num2);
                break;
            default:
                break;
        }
    }
    return
}

// EVENTOS DOS BOTÕES
botoes.forEach(btn =>
    btn.addEventListener('click', (e => {
        const valor = e.target.innerText;

        if (Number(valor) >= 0 || valor === ".") {
            adicionarDigito(valor);
        }

        if (valor === 'CE') {
            limparTela();
        }

        if (valor === 'C') {
            zerarCalculadora();
        }

        if (valor === 'DEL') {
            removerDigito();
        }

        if (valor === '/' || valor === '+' || valor === '-' || valor === 'x') {
            if (!tela_op_atual.innerHTML) {
                num1 = Number(tela_op_anterior.innerHTML);
            } else {
                num1 = Number(tela_op_atual.innerHTML);
            }
            operacao = valor;
            tela_op_anterior.innerText += tela_op_atual.innerText + valor;
            tela_op_atual.innerText = '';
        }

        if (valor === '=') {
            num2 = Number(tela_op_atual.innerText);
            fazerOperacao();
        }
    })));