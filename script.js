// Chaves de API do Chocolexx AI
window.GROQ_KEY = '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';
window.TOGETHER_KEY = 'key_CZf9SK4289nLvKGZY8BE3';
window.HF_KEY = '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';

// Definições de comportamento para cada modo
const modeSystemPrompts = {
  geral: 'Você é a Chocolexx AI, uma assistente inteligente e direta. Responda de forma clara e útil, como o ChatGPT. Não force referências a chocolate nas respostas. Seja natural e objetivo.',
  estudos: 'Você é a Chocolexx AI no modo Estudos. Ajude o usuário a aprender de forma clara e didática. Vá direto ao ponto, use exemplos quando necessário. Seja como um professor paciente e objetivo.',
  conversa: 'Você é a Chocolexx AI no modo Conversa. Bata papo de forma natural e descontraída, como um amigo. Seja informal mas sem exagerar em temas ou referências forçadas.'
};

// Define o modo inicial como "Geral"
window.currentSystemPrompt = modeSystemPrompts.geral;

// Função para trocar o modo visualmente e no sistema
window.setMode = function(mode) {
  // Atualiza o prompt que será enviado para a IA
  window.currentSystemPrompt = modeSystemPrompts[mode];
  
  // Atualiza a aparência dos botões (qual está ativo)
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  
  console.log("Modo alterado para: " + mode);
};