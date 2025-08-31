let chatInput = document.getElementById("chatInput");
let chatDisplay = document.getElementById('chatDisplay');
let enviaMsg = document.getElementById('enviaMsg');
let navText = document.querySelector('.navtext');
let nome = '';
let email = '';

Array.from(document.querySelectorAll('aside p')).forEach((menu, key)=>{
    menu.addEventListener('click', function () {
        console.log('clicou no menu: '+ key)
        document.querySelector('.selected').classList.remove('selected');
        this.classList.add('selected')
        console.log(this)
    });
})
chatInput.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        newMessageUser(chatInput.value)
    }
});

enviaMsg.addEventListener('click', ()=>{
    newMessageUser(chatInput.value)
})

proxMsg()

function newMessageUser(text){
    if (text.trim() && posIaMessage < messagesIA.length) {
        let modeloMsg = document.getElementById('modeloRecebida').cloneNode(true);
        modeloMsg.innerText = text;
        modeloMsg.classList.remove('oculta')
        chatDisplay.appendChild(modeloMsg);
        if (posIaMessage === 1) {
            nome = text;
        } else if ((messagesIA.length - 1) === posIaMessage) {
            email = text;
        }
        chatInput.value = '';
        proxMsg()
    }
}

let messagesIA = [
    'Olá! sou o assistente digital inteligente que ajudará a conquistar o certificado ARTE (Produto Artesanal).<br><br>' +
    'Ao prosseguir, você concorda em compartilhar dados pra fins de estudos, manteremos total sigilo pois respeitamos sua privacidade.<br><br>'+
    'Para começar, qual é o seu nome?',
    '2 - Local da sua propriedade? <br> (município e estado) <br>',
    '3. Características da produção:<br><br>' +
    '3.1 - Quais produtos são produzidos? <br>(leite, queijo, mel, cachaça, embutidos etc.)',
    '3.3 - Volume médio de produção por mês<br> (especifique a unidade por produto. Ex: Leite 5 litros)',
    '4. Estrutura atual<br><br>' +
    '4.1 - Quais equipamentos utiliza na produção',
    '4.1 - Possui um espaço exclusivo pra produção?',
    '5. Regularização sanitária atual<br><br>'+
    '5.1 Segue boas práticas de produção conforme orientado pela Embrapa? <br>Saiba mais em: <a href="https://www.embrapa.br/agencia-de-informacao-tecnologica/cultivos/milho/pos-producao/agroindustria-do-milho/processamento/boas-praticas-de-fabricacao" target="_blank">Clique aqui</a>',
    '6. Expectativas e prazos.<br><br>' +
    '6.2 - Capital disponivel pra investimento em adaptações',
    '6.3 - Qual alcance geográfico espera atingir quando conquistar selo<br>(municipal, estadual ou nacional)?',
    '7 Possui algum e-mail pra receber uma cópia dessa entrevista? <br>(Se tiver, escreva apenas o endereço completo. Ex: meuemail@email.com)',
    'Demonstração finalizada! agradecemos pelo interesse em saber mais sobre nossa solução. <br>No momento estamos em fase de testes coletando dados pra entregar algo realmente proveitoso.<br><br>Assim que tivermos novidades, entraremos em contato novamente!'
]

let posIaMessage = 0;
function newMessageIA(){
    if(messagesIA[posIaMessage]){
        let modeloMsg = document.getElementById('modeloEnviada').cloneNode(true);
        modeloMsg.innerHTML = messagesIA[posIaMessage];
        modeloMsg.classList.remove('oculta')
        chatDisplay.appendChild(modeloMsg);
        posIaMessage++;
    }
    if(posIaMessage === messagesIA.length) {
        console.log('Enviou o email')
        enviarEmail({
            from_name: nome,
            content_messages: chatDisplay.outerHTML,
            reply_email: email,
        })
        navText.classList.add('oculta')
    }
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
function proxMsg(){
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    setTimeout(() => {
        newMessageIA()
    }, 1000);
}

async function enviarEmail(params) {
    emailjs.init("opqd51Lx9ibgRRZH0"); // chave pública
    try {
        await emailjs.send("service_io48tuj", "template_1laguyl", params);
    } catch (err) {
        alert("Falhou: " + err.text || err.message);
    }
}

async function enviarEmailAcesso() {
    emailjs.init("opqd51Lx9ibgRRZH0"); // chave pública
    try {
        await emailjs.send("service_io48tuj", "template_m3188aj", {});
    } catch (err) {
        alert("Falhou: " + err.text || err.message);
    }
}

enviarEmailAcesso()