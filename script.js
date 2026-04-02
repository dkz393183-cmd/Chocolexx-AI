window.GROQ_KEY = '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';

const modeSystemPrompts = {
  geral: 'Você é a Chocolexx AI, uma assistente inteligente e direta. Responda de forma clara e útil.',
  estudos: 'Você é a Chocolexx AI no modo Estudos. Ajude o usuário a aprender de forma didática e objetiva.',
  conversa: 'Você é a Chocolexx AI no modo Conversa. Bata papo de forma natural e amigável.'
};

window.currentSystemPrompt = modeSystemPrompts.geral;

window.setMode = function(mode) {
  window.currentSystemPrompt = modeSystemPrompts[mode];
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
};