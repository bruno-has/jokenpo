const btn = document.querySelectorAll('.botoes')
const res = document.querySelector('#res')
const resultado = document.querySelector('#resultado')
const placar = document.querySelector('#placar')
let analisando = false   
let jogos = 0
let vitorias = 0
let derrotas = 0
let empates = 0

btn.forEach((botao) => {
    botao.addEventListener('click', function () {
        // Evita que o usuário clique várias vezes em um botão 
        if (analisando) {
            return 
        } else {
            analisando = true  
            jogos += 1
            res.innerHTML = ''
            resultado.innerHTML = 'Analisando...'

            // Adiciona a imagem da máquina
            const maquina = escolhaMaquina()
            const imagem = document.createElement('img') 
            imagem.setAttribute('src', 'imagens/' + maquina + '.png')
            res.appendChild(imagem) 
            
            // Verifica quem ganhou
            const jogador = botao.id 
            setTimeout(() => { // Método de tempo de espera para exibir o resultado
                if (maquina === jogador) {
                    resultado.innerHTML = 'Empate!'
                    empates += 1
                } else if (jogador === 'pedra' && maquina === 'tesoura') {
                    resultado.innerHTML = 'Jogador ganhou!'
                    vitorias += 1
                } else if (jogador === 'tesoura' && maquina === 'papel') {
                    resultado.innerHTML = 'Jogador ganhou!'
                    vitorias += 1
                } else if (jogador === 'papel' && maquina === 'pedra') {
                    resultado.innerHTML = 'Jogador ganhou!'
                    vitorias += 1
                } else {
                    resultado.innerHTML = 'Máquina ganhou!'
                    derrotas += 1
                }
                placar.innerHTML = `Jogos: ${jogos} / Vitórias: ${vitorias} / Derrotas: ${derrotas} / Empates: ${empates}`  
                analisando = false
            }, 1500)
        } 
    })
})

// Função para máquina escolher uma opção aleatória
function escolhaMaquina() {
    const sorteio = Math.floor(Math.random() * 3)
    const opcoes = ['pedra', 'papel', 'tesoura']
    return opcoes[sorteio]
}

// Função para zerar placar
const zerar = document.getElementById('zerar')
zerar.addEventListener('click', function () {
    if (jogos == 0) {
        alert('Não há jogos para zerar')
    } else {
        placar.innerHTML = ''
        jogos = 0
        vitorias = 0
        derrotas = 0
        empates = 0
    }
})