import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Bot } from 'lucide-react';
import './ChatWidget.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechSupported(true);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply || "Sorry, I couldn't understand that.", sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Error connecting to server. Please try again later.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const startVoice = () => {
    if (!speechSupported) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Optional: automatically send when voice finishes, but user might want to edit.
    };
    recognition.start();
  };

  return (
    <div className="chat-widget-container">
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="chat-header">
          <div className="header-info">
            <div className="bot-avatar">
              <Bot size={24} />
              <div className="online-dot"></div>
            </div>
            <div className="header-text">
              <h3>ANITS Assistant</h3>
              <p>Online | Translates Any Language</p>
            </div>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="chat-body">
          {messages.length === 0 && (
            <div className="welcome-msg">
              👋 Hello! I am the ANITS AI Assistant. <br/>You can type or speak in <strong>English, Telugu, Hindi</strong> or any other language!
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message bot typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="chat-footer">
          <div className="input-wrapper">
            {speechSupported && (
              <button 
                className={`action-btn mic-btn ${isListening ? 'listening' : ''}`} 
                onClick={startVoice} 
                title="Use Microphone"
              >
                <Mic size={18} />
              </button>
            )}
            <input 
              className="chat-input-field"
              type="text" 
              placeholder="Ask a question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button 
            className="send-btn" 
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send size={16} style={{ marginLeft: '2px' }} />
          </button>
        </div>

      </div>
      
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={32} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
