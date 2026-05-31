(function () {
  'use strict';

  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function appendMessage(container, text, role) {
    const div = document.createElement('div');
    div.className = 'message ' + role;

    // Сохраняем переносы строк (для уточняющих вопросов)
    const formatted = escHtml(text).replace(/\n/g, '<br>');

    if (role === 'ai') {
      div.innerHTML =
        '<div class="avatar" style="background-color:#FF4D1C">P</div>' +
        '<div class="msg-bubble">' + formatted + '</div>';
    } else {
      div.innerHTML = '<div class="msg-bubble">' + formatted + '</div>';
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  }

  function showTyping(container) {
    const div = document.createElement('div');
    div.className = 'message ai chatbot-typing';
    div.innerHTML =
      '<div class="avatar" style="background-color:#FF4D1C">P</div>' +
      '<div class="msg-bubble" style="opacity:0.55">...</div>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var messagesEl = document.querySelector('.chatbot-messages');
    var inputEl    = document.getElementById('chatbot-input-field');
    var sendBtn    = document.getElementById('chatbot-send-btn');

    if (!messagesEl || !inputEl || !sendBtn) return;

    async function sendMessage() {
      var question = inputEl.value.trim();
      if (!question) return;

      inputEl.value = '';
      inputEl.disabled = true;
      sendBtn.disabled = true;

      appendMessage(messagesEl, question, 'user');
      var typing = showTyping(messagesEl);

      try {
        var data = await window.apiFetch('/rag/ask', {
          method: 'POST',
          body: JSON.stringify({ question: question }),
        });

        typing.remove();

        var answer = data.answer || '';
        if (data.needs_clarification && data.clarifying_questions && data.clarifying_questions.length) {
          answer += '\n\n' + data.clarifying_questions.map(function (q, i) {
            return (i + 1) + '. ' + q;
          }).join('\n');
        }

        appendMessage(messagesEl, answer || 'Нет информации по этому вопросу.', 'ai');
      } catch (err) {
        typing.remove();
        var msg = (err && err.detail) ? err.detail : 'Ошибка соединения. Попробуйте позже.';
        appendMessage(messagesEl, msg, 'ai');
      } finally {
        inputEl.disabled = false;
        sendBtn.disabled = false;
        inputEl.focus();
      }
    }

    sendBtn.addEventListener('click', sendMessage);

    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  });
})();
