let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

//aqui estou pegando os elementos do html e atribuindo a variaveis para manipular no js
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {//funcao que cria a ordem aleatoria de cores para o jogo 
    let colorOrder = Math.floor(Math.random() * 4);//funcao que gera numeros aleatorios de 0 a 3 para as cores do jogo 
    order[order.length] = colorOrder; //adiciona a cor gerada ao array de ordem 
    clickedOrder = [];//array que armazena a ordem dos cliques do usuario 

    for(let i in order) { //para cada item do array de ordem, ele vai acender a cor 
        let elementColor = createColorElement(order[i]);//funcao que retorna a cor 
        lightColor(elementColor, Number(i) + 1); //funcao que acende a cor
    }
}

//acende a proxima cor
let lightColor = (element, number) => { //funcao que acende a cor 
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected'); //adiciona a classe selected para acender a cor 
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected'); //remove a classe selected para apagar a cor
    });
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) { //se o botao clicado for diferente da ordem gerada no jogo
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => { //funcao que retorna a cor clicada pelo usuario
    clickedOrder[clickedOrder.length] = color;//adiciona a cor clicada ao array de ordem do usuario
    createColorElement(color).classList.add('selected');//adiciona a classe selected para acender a cor clicada

    setTimeout(() => {//set timeout para apagar a cor clicada pelo usuario 
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame();