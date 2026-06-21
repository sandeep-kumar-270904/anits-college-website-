import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div className="chatbot-widget">
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>ANITS Assistant</h3>
          <X style={{cursor:'pointer'}} onClick={() => setIsOpen(false)} />
        </div>
        <div className="chat-body">
          {messages.length === 0 && (
            <div style={{textAlign: 'center', color: '#666', marginTop: '20px'}}>
              Hello! How can I help you today?
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing-indicator">
              ...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="Type your question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={startVoice} title="Use Microphone"><Mic size={18} /></button>
          <button onClick={handleSend}><Send size={18} /></button>
        </div>
      </div>
      
      {!isOpen && (
        <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={30} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
