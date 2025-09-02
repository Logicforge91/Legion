// Load Chatbot dynamically
fetch("chatbot.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("chatbotContainer").innerHTML = html;

    const chatbot = document.getElementById("chatbot");
    const chatbotWindow = document.getElementById("chatbotWindow");
    const closeChat = document.getElementById("closeChat");
    const chatContent = document.getElementById("chatContent");
    const chatInput = document.getElementById("chatInput");
    const sendChat = document.getElementById("sendChat");

    // Toggle chatbot (Bootstrap version)
    chatbot.addEventListener("click", () => {
      chatbotWindow.classList.toggle("open");
    });

    closeChat.addEventListener("click", () => {
      chatbotWindow.classList.remove("open");
    });

    // Add message
    function addMessage(msg, isUser = true) {
      const div = document.createElement("div");
      div.className = `p-2 rounded-3 shadow-sm mb-2 ${isUser 
        ? "bg-primary text-white ms-auto text-end" 
        : "bg-light text-dark me-auto text-start"}`;
      div.style.maxWidth = "75%";
      div.textContent = msg;
      chatContent.appendChild(div);
      chatContent.scrollTop = chatContent.scrollHeight;
      return div;
    }

    // Typing indicator
    function showTyping() {
      const typingDiv = document.createElement("div");
      typingDiv.id = "typing";
      typingDiv.className = "p-2 rounded-3 bg-secondary text-white fst-italic small me-auto mb-2";
      typingDiv.textContent = "Legion AI is typing...";
      chatContent.appendChild(typingDiv);
      chatContent.scrollTop = chatContent.scrollHeight;
      return typingDiv;
    }

    // Portfolio Replies
    const portfolioReplies = {
      "about": "👋 I'm Suman K S — a passionate developer who loves building clean, modern web applications with PHP, JavaScript, and Bootstrap.",
      "skills": "⚡ My key skills include: PHP, Laravel, JavaScript (ES6+), Bootstrap 5, MySQL, and REST APIs.",
      "projects": "📂 I've worked on multiple projects, including portfolio websites, chatbots, and scalable web apps. Check out the 'Projects' section for details.",
      "contact": "📩 You can reach me via the Contact section or directly at my email: sumanks@example.com.",
      "resume": "📜 You can view and download my resume by clicking 'Access My Vault' in the Resume Modal.",
      "hello": "🤖 Hi there! How can I help you explore my portfolio today?",
      "hi": "🤖 Hello! Ask me about my skills, projects, or resume."
    };

    // Send message
    sendChat.addEventListener("click", () => {
      const message = chatInput.value.trim();
      if (!message) return;

      addMessage(message, true);
      chatInput.value = "";

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

    // Press Enter to send
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendChat.click();
    });
  });
