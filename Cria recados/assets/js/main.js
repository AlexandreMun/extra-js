// Importação por meio das classes
const inputNome = document.querySelector('.input-nome');
const inputMensagem = document.querySelector('.input-mensagem');
const btnSubmit = document.querySelector('.btn-submit');
const recados = document.querySelector('.recados');

// Muda o background
document.addEventListener('click', (e) => {
    const element = e.target;    // Captura o elemtento clicado

    // Verifica a classe e muda o backgroundColor com css
    if(element.classList.contains('btn-red')) document.body.style.backgroundColor = 'red';
    if(element.classList.contains('btn-yellow')) document.body.style.backgroundColor = 'yellow';
    if(element.classList.contains('btn-blue')) document.body.style.backgroundColor = 'blue';
});

// Se o botão enviar for clicado faz essa função
btnSubmit.addEventListener('click', function() {
    if(!inputNome.value) return;    // Não tem nome definido não adiciona
    criaRecado(`${inputNome.value}: ${inputMensagem.value}`);   // Chama a função que vai criar os recados
});

// Cria os recados
function criaRecado(textInput) {
    const li = document.createElement('li');    // Cria uma 'li'
    li.innerText = textInput;                   // Adiciona o texto do input na li
    recados.appendChild(li);                    // A li se torna filho de recados
    limpaInput();                               // Chama a função que limpa o input
    criaBotaoApagar(li);                        // Chama a função para criar o botão apagar
}

// Limpa o input dps de enviar
function limpaInput() {
    inputNome.value = '';       // Muda o valor do input para nada
    inputNome.focus();          // Foca no input nome
    inputMensagem.value = '';   // Muda o valor do input para nada
}

// Cria o botão apagar
function criaBotaoApagar(li) {
    li.innerText += ' ';                                    // Adiciona um espaço do lado dos recados
    const botaoApagar = document.createElement('button');   // Cria um botão
    botaoApagar.innerText = 'Apagar';                       // Adiciona 'Apagar' no botão
    botaoApagar.setAttribute('class', 'apagar');            // Adiciona a classe apagar
    li.appendChild(botaoApagar);                            // Torna filho da li
}

// Apagar
document.addEventListener('click', function(e) {
    const element = e.target;    // Captura o elemtento clicado
    
    // Se tiver apagar na classe ele apaga
    if(element.classList.contains('apagar')) element.parentElement.remove();
});

// Adiciona a funcionalidade da tecla 'enter' nos campos nome e mensagem
inputNome.addEventListener('keypress', function(e) {
    // Se o elemento clicado for igual ao enter ele cria o recado
    if(e.keyCode == 13) {
        if(!inputNome.value) return;                                // Se mensagem tiver vazio sai da função
        criaRecado(`${inputNome.value}: ${inputMensagem.value}`);   // Chama função criar recado
    }
});

inputMensagem.addEventListener('keypress', function(e) {
    // Se o elemento clicado for igual ao enter ele cria o recado
    if(e.keyCode == 13) {
        if(!inputMensagem.value) return;                            // Se mensagem tiver vazio sai da função
        criaRecado(`${inputNome.value}: ${inputMensagem.value}`);   // Chama função criar recado
    }
});