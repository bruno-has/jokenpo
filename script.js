const botoesJogada = document.querySelectorAll('.botoes')
const resultadoMaquina = document.querySelector('#resultadoMaquina')
const resultadoJogo = document.querySelector('#resultadoJogo')
const zerar = document.querySelector('#zerar')

const qntJogos = document.querySelector('.qntJogos')
const qntVitorias = document.querySelector('.qntVitorias')
const qntDerrotas = document.querySelector('.qntDerrotas')
const qntEmpates = document.querySelector('.qntEmpates')

const CHAVE_PLACAR = 'jokenpoPlacar'
let analisando = false

// Retorna um placar zerado
function placarInicial() {
  return {
    jogos: 0,
    vitorias: 0,
    derrotas: 0,
    empates: 0
  }
}

// Verifica se um valor salvo é um número inteiro válido
function validarNumero(valor) {
  if (Number.isSafeInteger(valor) && valor >= 0) {
    return valor;
  }

  return 0;
}

// Carregar placar do LocalStorage ou criar um novo
function carregarPlacar() {
  try {
    const placarSalvo = localStorage.getItem(CHAVE_PLACAR);

    if (placarSalvo === null) {
      return placarInicial();
    }

    const dados = JSON.parse(placarSalvo);
    if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
      return placarInicial();
    }

    const placar = {
      jogos: validarNumero(dados.jogos),
      vitorias: validarNumero(dados.vitorias),
      derrotas: validarNumero(dados.derrotas),
      empates: validarNumero(dados.empates)
    }

    const totalResultados = placar.vitorias + placar.derrotas + placar.empates;

    if (placar.jogos !== totalResultados) {
      return placarInicial();
    }

    return placar;

  } catch (erro) {
    console.error('Erro ao carregar o placar!', erro);
    return placarInicial();
  }
}

let estadoJogo = carregarPlacar()

function atualizarPlacar() {
  qntJogos.textContent = estadoJogo.jogos
  qntVitorias.textContent = estadoJogo.vitorias
  qntDerrotas.textContent = estadoJogo.derrotas
  qntEmpates.textContent = estadoJogo.empates
}

function salvarPlacar() {
  try {
    localStorage.setItem(CHAVE_PLACAR, JSON.stringify(estadoJogo))
  } catch (erro) {
    console.error('Não foi possível salvar o placar!', erro)
  }
}

atualizarPlacar()

const opcoes = ['pedra', 'papel', 'tesoura']

function escolhaMaquina() {
  const sorteio = Math.floor(Math.random() * opcoes.length)
  return opcoes[sorteio]
}

const regras = {
  pedra: 'tesoura',
  papel: 'pedra', 
  tesoura: 'papel'
}

function determinarVencedor(jogador, maquina) {
  if (jogador === maquina) {
    return ['empates', 'Empate!']
  }

  if (regras[jogador] === maquina) {
    return ['vitorias', 'Você ganhou!']
  }

  return ['derrotas', 'Máquina ganhou!']
}

// Habilita ou desabilita os botões de jogada
function desabilitarBotoes() {
  botoesJogada.forEach(botao => {
    botao.disabled = true
  })

  zerar.disabled = true
}

function habilitarBotoes() {
  botoesJogada.forEach(botao => {
    botao.disabled = false
  })
  zerar.disabled = false
}

// Jogadas do usuário
botoesJogada.forEach((botao) => {
  botao.addEventListener('click', function () {
    // Evita que o usuário clique várias vezes em um botão 
    if (analisando) {
      return 
    } else {
      analisando = true
      desabilitarBotoes()

      resultadoMaquina.textContent = ''
      resultadoJogo.textContent = 'Analisando...'
      
      // Adiciona a imagem da máquina
      const maquina = escolhaMaquina()
      const imagem = document.createElement('img') 
      imagem.setAttribute('src', 'imagens/' + maquina + '.png')
      imagem.setAttribute('alt', 'A máquina escolheu ' + maquina)

      resultadoMaquina.appendChild(imagem) 
      
      // Verifica quem ganhou
      const jogador = botao.id 
      setTimeout(() => {
        const resJogo = determinarVencedor(jogador, maquina) 

        estadoJogo.jogos += 1
        estadoJogo[resJogo[0]] += 1
        resultadoJogo.textContent = `${resJogo[1]}`

        atualizarPlacar()
        salvarPlacar()
        
        analisando = false
        habilitarBotoes()
        resultadoMaquina.textContent = ''
      }, 1000)
    } 
  })
})

// Função para zerar placar
zerar.addEventListener('click', function () {
  if (estadoJogo.jogos === 0) {
    alert('Não há jogos para zerar')
  } 

  if (analisando) {
    return
  }
  
  estadoJogo = placarInicial()
  atualizarPlacar()
  salvarPlacar()



  resultadoJogo.textContent = ''
  resultadoMaquina.textContent = ''
})