import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Mic } from 'lucide-react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsSupported(true);
    }
    setMessages([
      { sender: 'bot', text: 'Hello! I am the ANITS Campus Assistant. How can I help you today? You can type or speak in any language.' }
    ]);
  }, []);

  const handleVoiceInput = () => {
    if (!isSupported) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Could be dynamic
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    try {
      // In production, this should point to your deployed backend URL.
      // E.g. https://your-backend.com/chat
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, I couldn't process that." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: 'bot', text: "Network error. Please ensure the backend is running." }]);
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <h3>ANITS Assistant</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
            />
            {isSupported && (
              <button 
                onClick={handleVoiceInput} 
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                title="Speak"
              >
                <Mic size={20} color={isListening ? 'red' : 'currentColor'} />
              </button>
            )}
            <button onClick={handleSend} className="send-btn">
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={30} />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
