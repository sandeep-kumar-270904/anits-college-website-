console.log("Chatbot script loaded successfully!");

const chatbotAppWrapper = document.getElementById("my-chatbot-app");
const chatbotContainer = chatbotAppWrapper.querySelector(".chatbot-container");
const closeBtn = chatbotAppWrapper.querySelector(".close-btn-x");
const chatMessages = chatbotAppWrapper.querySelector(".chat-messages");
const chatInput = chatbotAppWrapper.querySelector(".user-input");
const sendBtn = chatbotAppWrapper.querySelector("#send-btn");
const micBtn = chatbotAppWrapper.querySelector("#mic-btn");

// Open the chatbot when the minimized container is clicked
chatbotContainer.addEventListener("click", () => {
    console.log("Chatbot container was clicked!"); // DEBUG MESSAGE
    if (!chatbotAppWrapper.classList.contains("show-chatbot")) {
        console.log("Opening chatbot..."); // DEBUG MESSAGE
        chatbotAppWrapper.classList.add("show-chatbot");
    }
});

// Close the chatbot when the 'x' is clicked
closeBtn.addEventListener("click", (event) => {
    console.log("Close button was clicked!"); // DEBUG MESSAGE
    event.stopPropagation(); // Prevents the container's click event from firing
    chatbotAppWrapper.classList.remove("show-chatbot");
});

const inputInitHeight = chatInput.scrollHeight;

const createChatMessage = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = `<p></p>`;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const showTypingAnimation = () => {
    const html = `<li class="chat incoming typing-animation"><div class="dot"></div><div class="dot"></div><div class="dot"></div></li>`;
    chatMessages.insertAdjacentHTML("beforeend", html);
    chatMessages.scrollTo(0, chatMessages.scrollHeight);
};

const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatMessages.appendChild(createChatMessage(userMessage, "outgoing"));
    chatMessages.scrollTo(0, chatMessages.scrollHeight);

    showTypingAnimation();

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        const botResponse = data.reply || "Sorry, no response from server.";
        const typingIndicator = chatMessages.querySelector(".typing-animation");
        if (typingIndicator) typingIndicator.remove();
        chatMessages.appendChild(createChatMessage(botResponse, "incoming"));
        chatMessages.scrollTo(0, chatMessages.scrollHeight);
    } catch (error) {
        const typingIndicator = chatMessages.querySelector(".typing-animation");
        if (typingIndicator) typingIndicator.remove();
        chatMessages.appendChild(createChatMessage("Error connecting to server.", "incoming"));
        chatMessages.scrollTo(0, chatMessages.scrollHeight);
    }
};

const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (recognition) {
    const recognitionInstance = new recognition();
    micBtn.addEventListener("click", () => recognitionInstance.start());
    recognitionInstance.onresult = (event) => {
        chatInput.value = event.results[0][0].transcript;
        handleChat();
    };
    recognitionInstance.onerror = (event) => console.error("Speech recognition error:", event.error);
} else {
    if(micBtn) micBtn.style.display = "none";
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

sendBtn.addEventListener("click", handleChat);