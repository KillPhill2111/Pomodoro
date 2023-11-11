function criaHoraEmSegundos(segundos) {
    const data = new Date(segundos * 1000); // cria uma função de tempo (data e hora) 
    return data.toLocaleTimeString('pt-BR', { //com o padrão Brasil
        hour12: false, //configurar apenas horas (hora:minuto:seg)
        timeZone: 'GMT' //zona 
    });
}

//criação dos buttons
const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');

let segundos = 0; //segundo partira do 0 e no inicia relogio colocaremos o tempo maimo do pomodoro ==> 25 minutos
let timer;

//aqui inicaremos o codigo do pomodoro
let pomodoroAtivo = false; //se o pomodoro estiver ativado, ou seja, atingiu o limite de tempo, se estiver false, ainda não ta na hr de descansar! 
let tempoPomodoro = 25 * 60; // 25 minutos em segundos como o tempo total do pomodoro (hora de trabalhar/estudar !)
let tempoPausaCurta = 5 * 60; // 5 minutos em segundos (descanso, vai tomar um café e/ou encher o saco do seu gato)
let tempoPausaLonga = 15 * 60; // 15 minutos em segundos (descanso !)

function iniciaRelogio() { //aqui da mesma forma que no codigo do timer iniciamos a função com a criação de um intervalo de tempo
    timer = setInterval(function () {
        segundos--; //com a diferença que iremos SUBTRAIR o tempo para a contagem do pomodoro
        if (segundos < 0) { // quando o tempo finalizar ele irá buscar o valor do pomodoro

            clearInterval(timer); //limpa o valor do ntervalo
            if (pomodoroAtivo) { //se true o pomodoro iniciará o descanso
                alert('Pomodoro concluído! Hora de uma pausa curta. Cadê seu gato ? ');
                segundos = tempoPausaCurta;
            } else {
                alert('Pausa concluída! Hora de mais um Pomodoro. GO BACK TO WORK ');
                segundos = tempoPomodoro;
            }
            pomodoroAtivo = !pomodoroAtivo; //verificação do valor do pomodoro, recebendo o !  
            iniciaRelogio(); //função de inicio de contagem
        }
        relogio.innerHTML = criaHoraEmSegundos(segundos);
    }, 1000);
}


// eventos e congiração dos bUtões
document.addEventListener('click', function (e) { //função anonima com um evento de parametro
    const el = e.target; //o enevto sera direcionado para um target (a partir da classe do elemnto html)
    if (el.classList.contains('zerar')) { //se a lista de classe conter ...
        clearInterval(timer);
        relogio.innerHTML = criaHoraEmSegundos(tempoPomodoro);
        segundos = tempoPomodoro;
        pomodoroAtivo = false; //pomodoro false cairá no else do iniciaRelogio()
    }
    if (el.classList.contains('iniciar')) {
        relogio.classList.remove('pausado');
        clearInterval(timer);
        iniciaRelogio();
    }
    if (el.classList.contains('pausar')) {
        relogio.classList.add('pausado');
        clearInterval(timer);
    }
});

relogio.innerHTML = criaHoraEmSegundos(tempoPomodoro);
segundos = tempoPomodoro;
