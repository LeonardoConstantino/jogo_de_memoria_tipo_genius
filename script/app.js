const AUDIOS = document.querySelectorAll('audio')
const BTN_INICIAR = document.querySelector('#iniciar')
const BTN_CORES = document.querySelectorAll('.cores')
const BTN_RESETAR = document.querySelector('#Reset')
let listaSequenciaMaquina = []
let listaSequenciaJogador = []
let ini = 0

AUDIOS[4].play()

function add_random_numb_seq_maq() {
    listaSequenciaMaquina.push(Math.floor(Math.random() * 4))
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

function tocar_audio_correto(audio) {
    AUDIOS[audio].currentTime = '-0.5'
    AUDIOS[audio].play()
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

function liberar_p_jogador(poiter) {
    for (let i = 0; i < BTN_CORES.length; i++) {
        BTN_CORES[i].style.pointerEvents = poiter
    }
}

function zerar() {
    listaSequenciaMaquina = []
    listaSequenciaJogador = []
    ini = 0
    BTN_INICIAR.value = 'Iniciar'
}
function jogador_nao_completou_sequencia() {
    if (listaSequenciaJogador.length < listaSequenciaMaquina.length) {
        return true
    }
    return false
}

function jogada_valida() {
    for (let i = 0; i < listaSequenciaMaquina.length; i++) {
        if (listaSequenciaJogador[i] !== listaSequenciaMaquina[i]) {
            return false
        }
    }
    listaSequenciaJogador = []
    return true
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


BTN_INICIAR.addEventListener('click', () => {
    if (BTN_INICIAR.value == 'Iniciar') {
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
            listaSequenciaJogador.push(0)
            tocar_audio_correto(0)
            if (jogada_valida()) {
                add_random_numb_seq_maq()
                mostrar_seq_nos_btn()
                return
            }
            if (jogador_nao_completou_sequencia()){return}
            fim_do_jogo()
        }
        if (CLASSE_DO_BOTAO_CLICADO == 'amarelo') {
            listaSequenciaJogador.push(1)
            tocar_audio_correto(1)
            if (jogada_valida()) {
                add_random_numb_seq_maq()
                mostrar_seq_nos_btn()
                return
            }
            if (jogador_nao_completou_sequencia()){return}
            fim_do_jogo()
        }
        if (CLASSE_DO_BOTAO_CLICADO == 'vermelho') {
            listaSequenciaJogador.push(2)
            tocar_audio_correto(2)
            if (jogada_valida()) {
                add_random_numb_seq_maq()
                mostrar_seq_nos_btn()
                return
            }
            if (jogador_nao_completou_sequencia()){return}
            fim_do_jogo()
        }
        if (CLASSE_DO_BOTAO_CLICADO == 'azul') {
            listaSequenciaJogador.push(3)
            tocar_audio_correto(3)
            if (jogada_valida()) {
                add_random_numb_seq_maq()
                mostrar_seq_nos_btn()
                return
            }
            if (jogador_nao_completou_sequencia()){return}
            fim_do_jogo()
        }
    })
}
