const API_KEY = "AIzaSyBO8LVpBpbS-YFwKJ2CrtKl4__gKSKF-XE"; 
let modoAtual = "Geral";

// Função para mudar o modo (Estudos, Geral, Conversa)
function mudarModo(novoModo) {
    modoAtual = novoModo;
    document.getElementById('status-modo').innerHTML = `Modo Atual: <strong>${novoModo}</strong>`;
    adicionarMensagem("Sistema", `Você entrou no modo ${novoModo}. Como posso ajudar?`);
}

// Eventos de clique e tecla Enter
document.getElementById('send-btn').addEventListener('click', enviarMensagem);

document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensagem();
});

async function enviarMensagem() {
    const input = document.getElementById('user-input');
    const texto = input.value;

    if (texto.trim() !== "") {
        adicionarMensagem("Você", texto);
        input.value = "";
        
        const respostaIA = await buscarRespostaIA(texto);
        adicionarMensagem("Chocolexx AI", respostaIA);
    }
}

function adicionarMensagem(autor, texto) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.style.marginBottom = "15px";
    
    if (autor === "Você") {
        msgDiv.innerHTML = `<span style="color: #d2691e;"><strong>${autor}:</strong></span> ${texto}`;
    } else {
        msgDiv.innerHTML = `<span style="color: #f3e5ab;"><strong>${autor}:</strong></span> ${texto}`;
    }
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// CONEXÃO COM GOOGLE GEMINI (Versão Especial para Escola)
async function buscarRespostaIA(pergunta) {
    let instrucao = `Você é a Chocolexx AI. Responda de forma curta no modo ${modoAtual}. `;
    
    // O timestamp (?t=...) engana o bloqueio de cache do Chromebook
    const timestamp = new Date().getTime();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}&t=${timestamp}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: instrucao + pergunta }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            console.error("Erro detectado:", data.error.message);
            return "O Google ainda está processando a chave. Tente novamente em 2 minutos!";
        }
        
        return "Tive um erro interno. Pode perguntar de novo?";
        
    } catch (error) {
        return "Erro de conexão. O Wi-Fi da escola pode estar bloqueando o site.";
    }
}