// encontra o botao
const buttonCopiar = document.getElementById('btn-copiar')
//configura a funcao que sera chamada uando ele for pressionado
buttonCopiar.onclick = copiar;

// Encontra as inputs
const nomeInput = document.getElementById('nome');
const localInput = document.getElementById('local');
const celularInput = document.getElementById('celular');
const cargosInput = document.getElementById('cargos');
const setorInput = document.getElementById('setor');

// adiciona um metodo que realiza uma funcao quando um eventoacontece
// no caso o evento chama-se: "input" e ocorre quando o texto digitado se altera
// ou quando o valor selecionado altera
nomeInput.addEventListener('input', () => btn('nomeInput'))
localInput.addEventListener('input', () => btn('localInput'))
celularInput.addEventListener('input', () => btn('celularInput'))
cargosInput.addEventListener('input', () => btn('cargosInput'))
setorInput.addEventListener('change', () => btn('cargosInput'))

// encontra os campos a serem preenchidos na assinatura
const nomeCompletoField = document.getElementById('nome-assinatura');
const localField = document.getElementById('local-assinatura');
const celularField = document.getElementById('celular-assinatura');
const cargosField = document.getElementById('setor-cargo-assinatura');


function btn(obj) {
  if(obj==='nomeInput'){
    var nome = nomeInput.value;
    let nomeCompleto = nome;
    nomeCompletoField.innerHTML = editaNome(nomeCompleto);
  }else if(obj === 'localInput'){
    var local = localInput.options[localInput.selectedIndex].value;
    localField.innerHTML = local;
  }else if (obj === 'celularInput') {
    var celular = celularInput.value;
    if (celular.trim() === '') {
        celularField.innerHTML = ''; 
        celularField.removeAttribute('href');
    } else {
      const numeroFormatado = editaCelular(celular);
      
      if (numeroFormatado) {
          celularField.innerHTML = `Contato: ${numeroFormatado}`;
          celularField.setAttribute('href', `https://wa.me/55${numeroFormatado.replace(/ /g, '')}`);
      } else {
          // Se o número não for válido, exiba uma mensagem padrão ou de erro
          celularField.innerHTML = 'Número de contato inválido';
          celularField.removeAttribute('href'); // Remove o link se o número não for válido
      }
  }
  }else if (obj === 'cargosInput' || obj === 'setorInput'){
    var cargo = cargosInput.value;
    //var setor = document.getElementById('setor').value;
    var setor = setorInput.value;

    if(setor && cargo){
      //cargosField.innerHTML = `${setor} - ${cargo}`;
      document.getElementById('setor-cargo-assinatura').innerHTML = `${setor} - ${editaCargo(cargo)}`;
    }else if(setor){
      //cargosField.innerHTML = setor;
      document.getElementById('setor-cargo-assinatura').innerHTML = setor;
    } else if (cargo){
      //cargosField.innerHTML = cargo;
      document.getElementById('setor-cargo-assinatura').innerHTML = editaCargo(cargo)
    } else{
      //cargosField.innerHTML = '';
      document.getElementById('setor-cargo-assinatura').innerHTML = '';
    }
  }
}

function editaNome(nome) {
  let palavras = nome.split(' ')
  // separa o nome em palavras: "diego ferreira" -> ["diego", "ferreira"]
  for (let i = 0; i < palavras.length; i++) {
    // itera entre cada palavra, transformando a primeira letra em maiuscula
    palavras[i] = primeirasMaiusculas(palavras[i])
  }
  if (palavras.join(' ') == ' ') {
    // se não houver nada, quer dizer que o usuario apagou tudo nas inputs
    // portanto, retorna o valor inicial
    return 'Nome Completo'
  }
  // senão, retorna as palavras juntas
  //["Diego", "Ferreira"] -> "Diego Ferreira"
  return palavras.join(' ')
}

function editaCargo(cargo) {
  let palavras = cargo.split(' ')
  // separa o nome em palavras
  for (let i = 0; i < palavras.length; i++) {
    // itera entre cada palavra, transformando a primeira letra em maiuscula
    palavras[i] = primeirasMaiusculas(palavras[i])
  }
  if (palavras.join(' ') == ' ') {
    // se não houver nada, quer dizer que o usuario apagou tudo nas inputs
    // portanto, retorna o valor inicial
    return 'Cargo'
  }
  // senão, retorna as palavras juntas
  return palavras.join(' ')
}


function primeirasMaiusculas(palavra) {
  // Retorna a palavra com a primeira letra maiuscula
  let n = palavra.length;
  if (n > 1) {
    // se a palavra tiver mais de uma letra
    let primeiraLetra = palavra[0].toUpperCase() //coloca a primeira maiuscula
    let resto = palavra.slice(1) //coloca da segunda letra para frente: "diego".slice(1) = "iego"
    palavra = primeiraLetra + resto; //junta tudo
    return palavra
  } else {
    // se for só uma letra, coloca ela maiuscula
    return palavra.toUpperCase()
  }
}

function editaCelular(cel) {
  try {
    // Retira todos os espaços e símbolos que o usuário possa ter digitado
    cel = cel.replace(/ /g, '');
    cel = cel.replace(/\(/g, '');
    cel = cel.replace(/\)/g, '');
    cel = cel.replace(/\-/g, '');
    let n = cel.length;

    // Retorna o celular no formato certo com espaçamentos
    if (n === 0) {
      // Se não houver número, retorna o padrão
      return '';
    } else if (n < 3) {
      // Se for menor que 3, o usuário só digitou o DDD
      return cel;
    } else if (n === 10) {
      // Se o número tiver 10 dígitos (DDD + 8 dígitos)
      // Formato: "14 9999 9999"
      return cel.slice(0, 2) + ' ' + cel.slice(2, 6) + ' ' + cel.slice(6);
    } else if (n === 11) {
      // Se o número tiver 11 dígitos (DDD + 9 dígitos)
      // Formato: "14 99999 9999"
      return cel.slice(0, 2) + ' ' + cel.slice(2, 7) + ' ' + cel.slice(7);
    } else {
      // Se passar de 11, retorna uma string vazia
      return '';
    }
  } catch (err) {
    console.error(err);
    return 'Erro ao formatar o número';
  }
}

function copiar() {
  // seleciona a area onde a assinatura esta
  var area = document.getElementById("assinatura-div");
  if (document.body.createTextRange) {
    // para browsers antigos
    // cria um elemento chamado "range", move a area para dentro dele e o seleciona
    var range = document.body.createTextRange();
    range.moveToElementText(area);
    range.select();
    // executa o comando de copiar
    document.execCommand("Copy");
    alert("Copiado para a area de transferência");
  } else if (window.getSelection) {
    // para os outros
    // cria um elemento chamado "range", move a area para dentro dele e o seleciona
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(area);
    selection.removeAllRanges();
    selection.addRange(range);
    // executa o comando de copiar
    document.execCommand("Copy");
    alert("Copiado para a area de transferência");
  }
}


// Obtém o botão e o modal
var btn1 = document.getElementById("openModalBtn");
var modal = document.getElementById("myModal");

// Obtém o elemento de fechar dentro do modal
var span = document.getElementsByClassName("close")[0];
var fechar = document.getElementById("botao-fechar");

// Quando o usuário clicar no botão, abra o modal
btn1.onclick = function() {
  modal.style.display = "block";
}

// Quando o usuário clicar no elemento de fechar, feche o modal
span.onclick = function() {
  modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, feche-o
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

fechar.onclick = function(){
  modal.style.display = "none";
}