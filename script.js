const API_KEY = 'AIzaSyD6hyyizLOPTJHvl8ONs30t-b6-tyzkp6c';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

let currentMode = 'geral';

const modeLabels = {
  geral: 'Geral',
  estudos: 'Estudos 📚',
  conversa: 'Conversa 💬'
};

const modeSystemPrompts = {
  geral: 'Você é a Chocolexx AI, uma inteligência artificial com tema de chocolate. Responda de forma útil e geral. Seja simpático e use emojis de chocolate ocasionalmente.',
  estudos: 'Você é a Chocolexx AI no modo Estudos. Ajude o usuário a aprender e estudar conteúdos de forma clara, didática e detalhada. Use exemplos quando possível.',
  conversa: 'Você é a Chocolexx AI no modo Conversa. Bata papo de forma descontraída, divertida e amigável com o usuário. Seja informal e animado.'
};

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  document.getElementById('modeLabel').textContent = `Modo: ${modeLabels[mode]}`;
  addMessage('bot', `Modo <strong>${modeLabels[mode]}</strong> ativado! Como posso ajudar? 🍫`);
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  addMessage('user', text);
  input.value = '';

  const typingId = addTyping();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: modeSystemPrompts[currentMode] + '\n\nUsuário: ' + text }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    removeTyping(typingId);

    if (data.candidates && data.candidates[0]) {
      const reply = data.candidates[0].content.parts[0].text;
      addMessage('bot', reply.replace(/\n/g, '<br/>'));
    } else {
      console.error('Resposta inesperada da API:', JSON.stringify(data));
      const errMsg = data.error ? data.error.message : 'Resposta inválida da API.';
      addMessage('bot', `Erro: ${errMsg} 🍫`);
    }
  } catch (err) {
    removeTyping(typingId);
    console.error('Erro na requisição:', err);
    addMessage('bot', 'Erro ao conectar com a API. Verifique sua conexão. 🍫');
  }
}

function addMessage(sender, text) {
  const chatBox = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  const avatar = sender === 'bot' ? '🍫' : '🧑';
  div.innerHTML = `<span class="avatar">${avatar}</span><div class="bubble">${text}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTyping() {
  const chatBox = document.getElementById('chatBox');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'message bot typing';
  div.id = id;
  div.innerHTML = `<span class="avatar">🍫</span><div class="bubble">digitando...</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
