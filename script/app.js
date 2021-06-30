const AUDIOS = document.querySelectorAll('audio')
const BTN_INICIAR = document.querySelector('#iniciar')
const BTN_CORES = document.querySelectorAll('.cores')
const PLACAR = document.querySelector('#placar')
const PLACAR2 = document.querySelector('#placar2')
let listaSequenciaMaquina = []
let listaSequenciaJogador = []
let jogadasRestantes = 0
let ini = 0

function add_random_numb_seq_maq() {
    listaSequenciaMaquina.push(Math.floor(Math.random() * 4))
    atualiza_placar_jogadas_restantes(true)
}
function atualiza_placar(placar) {
    jogadasRestantes = listaSequenciaMaquina.length
    PLACAR.innerHTML = (placar < 10)? '0' + placar : placar 
}

function tocar_audio_correto(audio) {
    AUDIOS[audio].currentTime = '-0.5'
    AUDIOS[audio].play()
}

function liberar_p_jogador(poiter) {
    for (let i = 0; i < BTN_CORES.length; i++) {
        BTN_CORES[i].style.pointerEvents = poiter
    }
}

function jogador_nao_completou_sequencia() {
    if (listaSequenciaJogador.length < listaSequenciaMaquina.length) {
        return true
    }
    return false
}

function zerar() {
    listaSequenciaMaquina = []
    listaSequenciaJogador = []
    ini = 0
    BTN_INICIAR.value = 'Iniciar'
}

function atualiza_placar_jogadas_restantes(add) {
    if (add) {++jogadasRestantes}
    else {jogadasRestantes--}
    PLACAR2.innerHTML = (jogadasRestantes < 10)
        ?'0' + jogadasRestantes 
        :jogadasRestantes 
}

function jogada_valida() {
    for (let i = 0; i < listaSequenciaMaquina.length; i++) {
        if (listaSequenciaJogador[i] !== listaSequenciaMaquina[i]) {
            return false
        }
    }
    listaSequenciaJogador = []
    atualiza_placar(listaSequenciaMaquina.length)
    return true
}

function resutado_da_jogada(bntClicado) {
    listaSequenciaJogador.push(bntClicado)
    tocar_audio_correto(bntClicado)
    atualiza_placar_jogadas_restantes()
    if (jogada_valida()) {
        add_random_numb_seq_maq()
        mostrar_seq_nos_btn()
        return
    }
    if (jogador_nao_completou_sequencia()){return}
    fim_do_jogo()
}

function mostrar_seq_nos_btn() {
    let intervalo = setInterval(()=>{
        if (ini == listaSequenciaMaquina.length) {
            clearInterval(intervalo)
            ini = 0
            return
        }
        piscar_cor_botao(BTN_CORES[listaSequenciaMaquina[ini]])
        tocar_audio_correto(listaSequenciaMaquina[ini])
        ++ini
    }, 1000)
}

function fim_do_jogo() {
    AUDIOS[4].play()
    liberar_p_jogador('none')
    zerar()
    let fim = 0
    let intervaloFimDoJogo = setInterval(() => {
        if (fim == 3) {clearInterval(intervaloFimDoJogo)}
        for (let i = 0; i < BTN_CORES.length; i++) {
            piscar_cor_botao(BTN_CORES[i])
        }
        ++fim
    },200)
}

function piscar_cor_botao(botao) {
    let sombra = ''
    if (botao == BTN_CORES[0]) {sombra = '-4px -4px 30px 18px #58fa0160'}
    if (botao == BTN_CORES[1]) {sombra = '4px -4px 30px 18px #FFE44560'}
    if (botao == BTN_CORES[2]) {sombra = '-4px 4px 30px 18px #E05C3660'}
    if (botao == BTN_CORES[3]) {sombra = '4px 4px 30px 18px  #41C6E060'}

    botao.style.boxShadow = `${sombra}`
    botao.style.filter = 'contrast(300%)'

    setTimeout(() => {
        botao.style.boxShadow = ''
        botao.style.filter = ''
    }, 300);
}


BTN_INICIAR.addEventListener('click', () => {
    if (BTN_INICIAR.value == 'Iniciar') {
        atualiza_placar('0')
        AUDIOS[4].pause()
        liberar_p_jogador('auto')
        zerar()
        add_random_numb_seq_maq()
        mostrar_seq_nos_btn()
        BTN_INICIAR.value = 'Resetar'
        return
    }
    fim_do_jogo()
})

for (let i = 0; i < BTN_CORES.length; i++) {
    BTN_CORES[i].addEventListener("click", (e) => {
        const CLASSE_DO_BOTAO_CLICADO = e.target.classList[1]
        
        if (CLASSE_DO_BOTAO_CLICADO == 'verde') {
            resutado_da_jogada(0)
        }
        if (CLASSE_DO_BOTAO_CLICADO == 'amarelo') {
            resutado_da_jogada(1)
        }
        if (CLASSE_DO_BOTAO_CLICADO == 'vermelho') {
            resutado_da_jogada(2)
        }
        if (CLASSE_DO_BOTAO_CLICADO == 'azul') {
            resutado_da_jogada(3)
        }
    })
}
