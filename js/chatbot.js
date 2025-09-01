// Load Chatbot dynamically
fetch("chatbot.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("chatbotContainer").innerHTML = html;

    const chatbot = document.getElementById('chatbot');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChat = document.getElementById('closeChat');
    const chatContent = document.getElementById('chatContent');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');

    // Toggle chatbot
    chatbot.addEventListener('click', () => {
      chatbotWindow.classList.toggle('opacity-0');
      chatbotWindow.classList.toggle('pointer-events-none');
      chatbotWindow.classList.toggle('scale-95');
      chatbotWindow.classList.toggle('scale-100');
    });

    closeChat.addEventListener('click', () => {
      chatbotWindow.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
      chatbotWindow.classList.remove('scale-100');
    });

    // Add message
    function addMessage(msg, isUser = true) {
      const div = document.createElement('div');
      div.className = `px-4 py-2 rounded-2xl max-w-[75%] break-words shadow 
        ${isUser 
          ? 'bg-indigo-500 text-white self-end rounded-br-sm' 
          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 self-start rounded-bl-sm'}`;
      div.textContent = msg;
      chatContent.appendChild(div);
      chatContent.scrollTop = chatContent.scrollHeight;
      return div;
    }

    // Typing indicator
    function showTyping() {
      const typingDiv = document.createElement('div');
      typingDiv.id = "typing";
      typingDiv.className = "px-4 py-2 rounded-2xl bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 self-start italic text-sm animate-pulse";
      typingDiv.textContent = "Legion AI is typing...";
      chatContent.appendChild(typingDiv);
      chatContent.scrollTop = chatContent.scrollHeight;
      return typingDiv;
    }

    // Portfolio Replies
    const portfolioReplies = {
      "about": "👋 I'm Suman K S — a passionate developer who loves building clean, modern web applications with PHP, JavaScript, and Tailwind CSS.",
      "skills": "⚡ My key skills include: PHP, Laravel, JavaScript (ES6+), Tailwind CSS, MySQL, and REST APIs.",
      "projects": "📂 I've worked on multiple projects, including portfolio websites, chatbots, and scalable web apps. Check out the 'Projects' section for details.",
      "contact": "📩 You can reach me via the Contact section or directly at my email: sumanks@example.com.",
      "resume": "📜 You can view and download my resume by clicking 'Access My Vault' in the Resume Modal.",
      "hello": "🤖 Hi there! How can I help you explore my portfolio today?",
      "hi": "🤖 Hello! Ask me about my skills, projects, or resume."
    };

    // Send message
    sendChat.addEventListener('click', () => {
      const message = chatInput.value.trim();
      if (!message) return;
      
      addMessage(chatInput.value, true);
      chatInput.value = '';

      // Show typing indicator
      const typing = showTyping();

      setTimeout(() => {
        typing.remove();
        let reply = "🤖 Legion AI: You said → " + message;
        for (const key in portfolioReplies) {
          if (message.toLowerCase().includes(key)) {
            reply = portfolioReplies[key];
            break;
          }
        }
        addMessage(reply, false);
      }, 1200);
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChat.click();
    });
  });
