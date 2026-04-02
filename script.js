window.GROQ_KEY = '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';

const modeSystemPrompts = {
  geral: 'Você é a Chocolexx AI. Responda de forma curta e objetiva.',
  estudos: 'Você é a Chocolexx AI no modo Estudos. Explique de forma simples.',
  conversa: 'Você é a Chocolexx AI no modo Conversa. Seja amigável.'
};

window.currentSystemPrompt = modeSystemPrompts.geral;

window.setMode = function(mode) {
  window.currentSystemPrompt = modeSystemPrompts[mode];
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
};