# ANITS AI Assistant 🤖🎓

Welcome to the **ANITS Chatbot**, a state-of-the-art Generative AI agent exclusively built for Anil Neerukonda Institute of Technology & Sciences.

This project unifies a modern React frontend with a highly intelligent Python backend, powered by MongoDB Vector DB, Google Gemini RAG, and omnichannel integrations (Telegram & Twilio WhatsApp). 

---

## 🌟 Key Features

- **Omnichannel Support**: Engage with the AI natively on the College Website, Telegram, or WhatsApp!
- **Hinglish/Multilingual NLP**: Speaks your language natively. Whether you ask in pure English or Romanized Telugu/Hindi (e.g., *"anits kaisa college hai?"*), it seamlessly understands and responds back in the exact same style.
- **RAG Architecture**: (Retrieval-Augmented Generation) It uses `sync_vectors.py` to embed all college policies, circulars, and syllabuses into a MongoDB Atlas Vector Search Database. The AI then securely searches this DB to generate 100% accurate, hallucination-free answers.
- **Push-to-Talk (Voice)**: Features a beautiful voice-recognition button on the React frontend.
- **Admin Dashboard**: Contains a gorgeous glassmorphism Admin UI to view chatbot analytics, most frequently asked questions, and to effortlessly trigger Vector DB Auto-Syncs by simply uploading PDFs.
- **Conversational Memory**: Remembers context securely using unique session IDs spanning across all platforms.

---

## 🛠 Tech Stack

### Frontend (React/Vite)
- React 19 + Vite
- TailwindCSS (Styling)
- Lucide React (Icons)
- React Router (Routing & Admin Dashboard)

### Backend (Python/Flask)
- Flask + Flask-CORS (Web Server & Webhooks)
- Google Gemini (`google-genai`) for LLM Processing
- MongoDB Atlas (Database & Vector Search Indexing)
- Twilio REST API (WhatsApp Integration)
- python-telegram-bot (Telegram long-polling)
- FastEmbed (Local sentence-transformers for Vectorization)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18+)
- Python 3.11+
- A MongoDB Atlas Cluster (with Vector Search Index enabled on the `college_data` collection)

### 2. Environment Setup
Create a `.env` file inside the `/backend` directory and add the following keys:
```env
# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster...

# AI Models
GEMINI_API_KEY=your_gemini_key

# Integrations
TELEGRAM_BOT_TOKEN=your_telegram_token
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

### 3. Start the Backend (Flask)
```bash
cd backend
python -m venv venv311
venv311\Scripts\activate
pip install -r requirements.txt

# Start the Flask API and Background Worker Threads
python app.py
```

### 4. Start the Frontend (React)
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173` to interact with the bot! Navigate to `http://localhost:5173/admin` to access the Admin Dashboard.

---

## 🔄 Auto-Sync Architecture
The Admin Dashboard allows you to upload new college PDFs (Syllabuses, Circulars, etc.) directly. When uploaded, the frontend hits `/api/sync` on the backend, which spins up a background thread running `sync_vectors.py`. 
This script automatically parses the text from the PDFs, chunks it, generates vector embeddings locally using FastEmbed, and upserts them into MongoDB—keeping the AI instantly updated without any manual terminal work!

---
*Built with ❤️ for ANITS College*