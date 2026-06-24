import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Bot } from 'lucide-react';
import './ChatWidget.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (audioBase64 = null) => {
    if (!input.trim() && !audioBase64) return;

    const userMessage = input.trim();
    if (userMessage) {
      setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
      setInput('');
    } else if (audioBase64) {
      setMessages(prev => [...prev, { text: "🎙️ Audio message sent...", sender: 'user' }]);
    }
    
    setIsTyping(true);

    try {
      const payload = { message: userMessage };
      if (audioBase64) {
        payload.audio = audioBase64;
      }
      
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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

  const startVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64String = reader.result;
          handleSend(base64String);
        };
        stream.getTracks().forEach(track => track.stop());
        setIsListening(false);
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error("Error accessing mic:", err);
      setIsListening(false);
    }
  };

  const stopVoice = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
    }
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
            <button 
              className={`action-btn mic-btn ${isListening ? 'listening' : ''}`} 
              onClick={isListening ? stopVoice : startVoice} 
              title={isListening ? "Stop Recording" : "Use Microphone"}
              style={isListening ? { color: 'red', animation: 'pulse 1s infinite' } : {}}
            >
              <Mic size={18} />
            </button>
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
            onClick={() => handleSend()}
            disabled={!input.trim() && !isListening}
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
