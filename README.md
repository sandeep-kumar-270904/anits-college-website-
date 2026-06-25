# 🎓 ANITS College Translation Chat Application

[![Python](https://img.shields.io/badge/Python-89.1%25-3776ab?style=flat-square&logo=python)](https://www.python.org/)
[![C++](https://img.shields.io/badge/C%2B%2B-7.1%25-00599c?style=flat-square&logo=cplusplus)](https://isocpp.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](https://github.com/sandeep-kumar-270904/anits-college-website-)

**Multi-language AI-powered campus assistant with real-time translation, PDF document processing, and intelligent FAQ matching for ANITS College.**

---

## 📋 Table of Contents

1. [Project Basics](#-project-basics)
2. [Overview](#-overview)
3. [Key Features](#-key-features)
4. [Technology Stack](#-technology-stack)
5. [Architecture](#-architecture)
6. [Project Structure](#-project-structure)
7. [Getting Started](#-getting-started)
8. [Development Workflow](#-development-workflow)
9. [API & Data Layer](#-api--data-layer)
10. [Performance & Optimization](#-performance--optimization)
11. [Deployment](#-deployment)
12. [Contributing](#-contributing)
13. [Security](#-security)
14. [Troubleshooting](#-troubleshooting)
15. [Roadmap](#-roadmap)
16. [License & Acknowledgments](#-license--acknowledgments)

---

## 🚀 Project Basics

| Aspect | Details |
|--------|---------|
| **Repository** | [sandeep-kumar-270904/anits-college-website-](https://github.com/sandeep-kumar-270904/anits-college-website-) |
| **Repository ID** | 1061097277 |
| **Primary Language** | Python (89.1%) |
| **Created** | September 21, 2025 |
| **License** | MIT |
| **Default Branch** | main |
| **Status** | Active Development |

**Secondary Languages:**
- C++ (7.1%)
- C (3.1%)
- Cython (0.3%)
- HTML (0.1%)

---

## 🎯 Overview

### Problem Statement

Indian colleges struggle with:
- **Language barriers** between diverse student populations speaking different languages
- **Information accessibility** for campus-related inquiries (admissions, departments, events)
- **Manual query handling** requiring constant staff intervention
- **Knowledge fragmentation** across PDFs, emails, and scattered documentation

### Solution

ANITS College Translation Chat Application is an **AI-powered multilingual campus assistant** that:
- Automatically detects user language and provides responses in their native tongue
- Intelligently matches queries against FAQ databases with fallback to LLM
- Processes college circulars and documents through PDF extraction
- Maintains comprehensive chat logs for analytics and continuous improvement
- Provides admin dashboards for monitoring and insights

### Target Audience

- **Primary:** Students at ANITS College across multiple linguistic backgrounds
- **Secondary:** Administrative staff managing campus inquiries
- **Tertiary:** College administrators tracking communication metrics

### Key Differentiators

| Feature | Benefit |
|---------|---------|
| **Real-time Language Detection** | No manual language selection required |
| **PDF Integration** | Automatic ingestion of circulars and official documents |
| **Hybrid FAQ + LLM Approach** | Fast FAQ matches + intelligent fallback for novel queries |
| **Multi-language Support** | 100+ languages via Google Translate |
| **Analytics Dashboard** | Track language usage patterns and frequent questions |
| **Production-Ready** | SQLite persistence, error handling, CORS-enabled |

---

## ✨ Key Features

### 🔊 Core Capabilities

| Feature | Description | Status |
|---------|-------------|--------|
| **Multilingual Chat** | Automatic language detection (12+ languages) | ✅ Active |
| **FAQ Matching** | Intelligent question-answer matching | ✅ Active |
| **AI Fallback** | Gemini 2.5 Flash for intelligent responses | ✅ Active |
| **PDF Processing** | Text extraction from college circulars | ✅ Active |
| **Chat Logging** | Full conversation history with metadata | ✅ Active |
| **Admin Analytics** | Language trends and question analysis | ✅ Active |
| **CORS Support** | Cross-origin requests support | ✅ Active |

### 👥 User Experience

- **Zero-configuration language support** - users type in their native language
- **Contextual responses** - college-specific knowledge base prioritized
- **Fallback gracefully** - human support contact info when uncertain
- **Fast response times** - FAQ hits < 50ms, LLM queries < 2s

### 💻 Developer Experience

- **Clean REST API** - JSON request/response format
- **Comprehensive logging** - structured error messages for debugging
- **Type hints ready** - SQLAlchemy models with clear contracts
- **Modular design** - separate PDF, translation, and chat logic
- **Environment-driven config** - `.env` for secrets and thresholds

---

## 🛠️ Technology Stack

### Backend Runtime & Framework

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| **Python** | 3.8+ | Runtime | Excellent ML/NLP ecosystem |
| **Flask** | 2.3.3 | Web Framework | Lightweight REST API framework |
| **Flask-CORS** | 4.0.0 | CORS Handling | Cross-origin request support |
| **Flask-SQLAlchemy** | 3.0.5 | ORM Layer | Database abstraction |

### Frontend Framework & UI

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| **React** | 18+ | UI Library | Component-based architecture for modern web apps |
| **Vite** | Latest | Build Tool | Lightning fast HMR and optimized builds |
| **Tailwind CSS** | Latest | Styling | Utility-first CSS framework for custom theming |
| **React Router** | 6+ | Navigation | Client-side routing for seamless page transitions |

### AI/NLP & Translation

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| **Google Gemini API** | Latest | Core LLM & Translation | Gemini 2.5 Flash for intelligent, multimodal responses |
| **langdetect** | Latest | Language Detection | Fast, accurate detection |

### Document Processing

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| **PyMuPDF** | 1.26.4 | PDF Extraction | Fast C-based PDF parsing |

### Data Persistence

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| **SQLite** | Built-in | Primary DB | Zero-config database |
| **SQLAlchemy** | Core | Query Layer | SQL injection protection |

### Environment & Security

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| **python-dotenv** | 1.0.0 | Config Management | Keep secrets out of code |

---

## 🏗️ Architecture

### System Design Overview

```
┌─────────────────────────────────────┐
│        CLIENT LAYER                 │
│  ┌─────────┬──────────┬──────────┐  │
│  │ Browser │ Mobile   │ Portal   │  │
│  └─────────┴──────────┴──────────┘  │
└─────────────────────────────────────┘
         │ HTTP/REST
┌─────────────────────────────────────┐
│     API SERVER LAYER (Flask)        │
│  /chat → Language Detection         │
│  /logs → Chat History               │
│  /analytics → Statistics            │
│  /admin → Dashboard                 │
└─────────────────────────────────────┘
         │ │ │
    ┌────┘ │ └──┐
    ▼      ▼    ▼
  PDF    FAQ   LLM
 Files  JSON  API
    │      │    │
    └──────┴────┘
         │
         ▼
┌─────────────────────────────────────┐
│  DATA PERSISTENCE (SQLite)          │
│  Table: chat_logs                   │
└─────────────────────────────────────┘
```

---

## 📁 Project Structure

```
anits-college-website-/
├── backend/                    # Flask application
│   ├── app.py                 # Main Flask app (182 lines)
│   ├── requirements.txt        # Backend dependencies
│   ├── database.db            # SQLite database
│   └── venv312/               # Virtual environment
├── frontend/                   # React Web UI
│   ├── public/                # Public assets
│   ├── src/                   # React source code
│   │   ├── components/        # Reusable React components (Navbar, Chatbot, etc.)
│   │   ├── pages/             # Route pages (Home, AdminDashboard, etc.)
│   │   ├── App.jsx            # Main React App routing
│   │   └── index.css          # Global Tailwind styles
│   ├── package.json           # React dependencies
│   └── vite.config.js         # Vite configuration
├── data/                       # Shared resources
│   ├── faqs.json              # FAQ database
│   └── circulars/             # PDF documents
├── .env.example               # Configuration template
├── requirements.txt           # Root dependencies
├── README.md                  # This file
└── LICENSE                    # MIT License
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip 20.0+
- Git 2.25+
- OpenAI API Key

### Step 1: Clone Repository

```bash
git clone https://github.com/sandeep-kumar-270904/anits-college-website-.git
cd anits-college-website-
```

### Step 2: Create Virtual Environment

```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
pip install -r backend/requirements.txt
```

### Step 4: Configure Environment

```bash
cp .env.example .env
# Edit .env with your API keys
```

### Step 5: Run Application

Terminal 1 (Backend):
```bash
cd backend
python app.py
```

Terminal 2 (Frontend):
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

---

## 💻 Development Workflow

### Code Style

Follow PEP 8 guidelines:

```python
# ✅ CORRECT
def extract_text_from_pdfs():
    """Extract text from PDFs."""
    data = ""
    pdf_dir = "data/circulars"
    
    for file in os.listdir(pdf_dir):
        if not file.endswith(".pdf"):
            continue
        try:
            with fitz.open(os.path.join(pdf_dir, file)) as doc:
                for page in doc:
                    data += page.get_text()
        except Exception as e:
            logger.error(f"Failed to extract {file}: {e}")
    return data

# ❌ INCORRECT - Poor naming, no error handling
def extract_pdfs():
    d = ""
    for f in os.listdir("data/circulars"):
        with fitz.open("data/circulars/" + f) as doc:
            for p in doc:
                d += p.get_text()  # Could crash silently
    return d
```

### Git Workflow

**Branch naming:**
```
feature/description       # New features
bugfix/issue-number      # Bug fixes
docs/description         # Documentation
```

**Commit messages (Conventional Commits):**
```
feat(chat): Add multilingual support
fix(pdf): Handle corrupted PDFs gracefully
docs(readme): Update deployment instructions
```

---

## 📡 API Endpoints

### POST /chat
Chat with automatic language detection

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I apply for hostel?"}'
```

**Request:**
```json
{"message": "string (required)"}
```

**Response:**
```json
{"reply": "string"}
```

### GET /logs
Retrieve chat history

```bash
curl http://localhost:5000/logs
```

### GET /analytics
View statistics

```bash
curl http://localhost:5000/analytics
```

### GET /admin
Admin dashboard

```
http://localhost:5000/admin
```

---

## ⚡ Performance Optimization

### Response Time Targets

| Operation | Target | Status |
|-----------|--------|--------|
| FAQ match | < 50ms | ✅ |
| Language detection | < 100ms | ✅ |
| Translation | < 500ms | ✅ |
| LLM query | < 2s | ✅ |
| **Total latency** | < 3s | ⚠️ Needs work |

### Database Indexing

Add indexes to improve query performance:

```python
class ChatLog(Base):
    __tablename__ = "chat_logs"
    __table_args__ = (
        Index('idx_language_timestamp', 'language', 'timestamp'),
    )
```

### Caching Strategies

```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def translate_cached(text: str, src: str, dest: str) -> str:
    """Cache translations to reduce API calls."""
    return translator.translate(text, src=src, dest=dest).text
```

---

## 🚢 Deployment

### Production Checklist

- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database backups enabled
- [ ] Error monitoring active
- [ ] Rate limiting configured
- [ ] CORS setup for production domain
- [ ] Admin dashboard password protected
- [ ] FAQ database populated

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "backend.app:app"]
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name chat.anits.edu.in;
    
    ssl_certificate /etc/letsencrypt/live/chat.anits.edu.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/chat.anits.edu.in/privkey.pem;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🤝 Contributing

### Pull Request Process

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes following PEP 8
4. Commit with conventional format: `git commit -m "feat: description"`
5. Push branch: `git push origin feature/your-feature`
6. Create pull request

### Code Review Checklist

- [ ] Follows PEP 8 style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Error handling comprehensive

---

## 🔒 Security

### CORS Configuration

```python
from flask_cors import CORS

CORS(app, resources={
    r"/chat": {
        "origins": [
            "https://anits.edu.in",
            "https://www.anits.edu.in"
        ],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})
```

### Input Validation

```python
MAX_MESSAGE_LENGTH = 5000

def validate_message(message: str) -> bool:
    if not message or len(message) > MAX_MESSAGE_LENGTH:
        return False
    return True
```

### Rate Limiting

```python
from flask_limiter import Limiter

limiter = Limiter(app)

@app.route("/chat", methods=["POST"])
@limiter.limit("5 per minute")
def chat():
    # Process chat...
```

---

## 🐛 Troubleshooting

### Common Issues

#### ModuleNotFoundError: No module named 'flask'
```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### FileNotFoundError: No such file or directory: '../data/faqs.json'
```bash
# Create FAQ file
mkdir -p data
cat > data/faqs.json << 'EOF'
[
  {
    "question": "What is ANITS?",
    "answer": "ANITS is a leading engineering college."
  }
]
EOF
```

#### sqlite3.OperationalError: database is locked
```python
# Use SQLite with connection pooling
from sqlalchemy.pool import NullPool

engine = create_engine(
    "sqlite:///database.db",
    poolclass=NullPool,
    connect_args={"timeout": 5}
)
```

#### Gemini 429 RESOURCE_EXHAUSTED
```python
# Fixed by truncating context and using background pre-warming threads.
# Ensure your context injection isn't exceeding the API limits.
```

### Debug Logging

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug("Language detected:", lang)
logger.error("Error occurred:", exc_info=True)
```

---

## 🚀 Roadmap

### Q3 2026
- [ ] Voice input support
- [ ] Enhanced FAQ system with ML scoring
- [ ] Real-time analytics dashboard

### Q4 2026
- [ ] Mobile app (Flutter)
- [ ] Campus system integration
- [ ] Multilingual FAQ expansion

### Q1 2027
- [ ] Model fine-tuning
- [ ] Sentiment analysis
- [ ] GDPR compliance

---

## 📄 License & Acknowledgments

This project is licensed under the MIT License - see [LICENSE](LICENSE)

**Credits:**
- Flask, SQLAlchemy, PyMuPDF communities
- Google Gemini API
- React & Vite ecosystems
- langdetect library

**Contributors:** Sandeep Kumar

---

**Last Updated:** June 25, 2026  
**Support:** cs@anits.edu.in | +91-891-2841111