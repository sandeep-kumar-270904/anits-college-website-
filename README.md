# ANITS AI Assistant 🤖

Welcome to the **ANITS Chatbot**, a state-of-the-art Generative AI agent exclusively built for Anil Neerukonda Institute of Technology & Sciences.

This project unifies a modern React frontend with a highly intelligent Python backend, powered by MongoDB Vector DB, Google Gemini RAG, and omnichannel integrations (Telegram & WhatsApp). 

---

## 🌟 Key Features

- **Omnichannel Support**: Engage with the AI natively on the College Website, Telegram, or WhatsApp!
- **Hinglish/Multilingual NLP**: Speaks your language natively. Whether you ask in pure English or Romanized Telugu/Hindi (e.g., *"anits kaisa college hai?"*), it seamlessly understands and responds back in the exact same style.
- **RAG Architecture**: Uses `sync_vectors.py` to embed all college policies, circulars, and syllabuses into a MongoDB Atlas Vector Search Database for 100% accurate, hallucination-free answers.
- **Universal Student Data Ingestion**: Upload massive CSV, XLSX, XLS, PDF, DOCX, TXT, or JSON files. The AI extracts the unstructured text and perfectly normalizes it into MongoDB student records!
- **Dynamic Schema Manager**: Automatically detects all data fields present in your student database and allows admins to permanently scrub/delete unwanted columns from all records with a single click.
- **Secure Telegram Auth**: The Telegram bot strictly verifies students before allowing them to query sensitive data. It requests the user's phone number natively and cryptographically checks it against the college's MongoDB student records. 
- **Admin Dashboard**: Contains a gorgeous glassmorphism Admin UI to view chatbot analytics, manage schemas, ingest student data, and broadcast announcements.
- **Conversational Memory**: Remembers context securely using unique session IDs spanning across all platforms.

---

## 🚀 Tech Stack

### Frontend (React/Vite)
- React 19 + Vite
- TailwindCSS (Styling)
- Lucide React (Icons)
- React Router (Routing & Admin Dashboard)

### Backend (Python/Flask)
- Flask + Flask-CORS (Web Server & Webhooks)
- Google Gemini 1.5 Pro/Flash (`google-genai`) for LLM Processing and Document Extraction
- MongoDB Atlas (Database & Vector Search Indexing)
- Twilio REST API (WhatsApp Integration)
- python-telegram-bot (Telegram long-polling & Secure Auth)
- pandas & PyMuPDF (Data parsing)

---

## 📝 Pending / TODO List

- [ ] **Twilio WhatsApp Integration**: We have the Twilio webhook skeleton in place, but we need to finalize the setup with the actual `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` to fully enable WhatsApp bot functionality.

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18+)
- Python 3.11+
- A MongoDB Atlas Cluster (with Vector Search Index enabled)

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
Navigate to `http://localhost:5173` to interact with the bot! Navigate to `http://localhost:5173/admin/login` to access the secure Admin Dashboard.

---
*Built with ❤️ for ANITS College*