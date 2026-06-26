import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Bot, Sun, Moon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ChatWidget.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // dark or light
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSend = async (audioBase64 = null) => {
    if (!input.trim() && !audioBase64) return;

    const visualMessage = input.trim() || (audioBase64 ? "🎙️ Audio message sent..." : "");
    
    if (visualMessage) {
      setMessages(prev => [...prev, { text: visualMessage, sender: 'user' }]);
      setInput('');
    }
    
    setIsTyping(true);

    // Generate or retrieve session_id for conversational memory
    let sessionId = sessionStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = 'web_' + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('chat_session_id', sessionId);
    }

    try {
      const payload = { session_id: sessionId };
      if (audioBase64) {
        payload.audio = audioBase64;
      } else {
        payload.message = visualMessage;
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      const replyText = data.reply || "Sorry, I couldn't understand that.";
      setMessages(prev => [...prev, { text: replyText, sender: 'bot' }]);
      
      // Text-to-Speech Output
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(replyText);
        utterance.text = replyText.replace(/[*#_]/g, '');
        window.speechSynthesis.speak(utterance);
      }

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
      // System A: The Visual Mirror (Browser Speech API)
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = null;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          setInput(transcript); // Purely for visual feedback!
        };
        recognition.start();
        window.__activeRecognition = recognition;
      }

      // System B: The Real Brain (MediaRecorder + Gemini)
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
          handleSend(base64String); // Send the raw audio to Gemini!
        };
        stream.getTracks().forEach(track => track.stop());
        setIsListening(false);
        if (window.__activeRecognition) {
           window.__activeRecognition.stop();
        }
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
    if (window.__activeRecognition) {
       window.__activeRecognition.stop();
    }
  };

  return (
    <div className={`chat-widget-container ${theme === 'light' ? 'light-mode' : ''}`}>
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
              <p>Online | Native Language Support</p>
              <div className="social-links mt-1 flex gap-2">
                <a href="https://t.me/anil_2026_bot" target="_blank" rel="noopener noreferrer" className="social-btn telegram-btn" title="Chat on Telegram" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0088cc', color: 'white', padding: '4px', borderRadius: '50%', width: '24px', height: '24px' }}>
                  <Send size={12} />
                </a>
                <a href="https://wa.me/14155238886?text=join%20something-something" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp-btn" title="Chat on WhatsApp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#25D366', color: 'white', padding: '4px', borderRadius: '50%', width: '24px', height: '24px' }}>
                  <MessageCircle size={12} />
                </a>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="close-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="chat-body">
          {messages.length === 0 && (
            <div className="welcome-msg">
              👋 Hello! I am the ANITS AI Assistant. <br/>You can type or speak in <strong>English, Telugu, Hindi</strong> and 20 other languages!
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              {msg.sender === 'bot' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
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
