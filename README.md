# ANITS College Translation Chat Application

> A college-based translation and chat application built with Flask and Python

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- Real-time translation support
- Chat messaging interface
- Multi-language support
- College-specific use case
- Document processing with PDF support
- Responsive web interface

## 🛠️ Tech Stack

- **Backend:** Python 3.8+, Flask
- **Frontend:** HTML, CSS, JavaScript
- **Document Processing:** PyMuPDF
- **Database:** (Configure in `.env`)
- **Additional Libraries:** See `requirements.txt`

## 📁 Project Structure

```
anits-college-website-/
├── backend/              # Flask backend application
├── frontend/             # Web interface and static assets
├── data/                 # Data files and resources
├── requirements.txt      # Python dependencies
├── .env.example          # Environment variable template
├── README.md             # This file
└── LICENSE               # MIT License
```

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment support

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/trailmail123456/anits-college-website-.git
cd anits-college-website-
```

### 2. Create and activate virtual environment

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 5. Run the application

```bash
cd backend
python app.py
```

The application should be accessible at `http://localhost:5000`

## 💻 Usage

### Starting the Application

```bash
# Activate virtual environment (if not already active)
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Run Flask app
cd backend
python app.py
```

### Features

- Access the chat interface at the root URL
- Use translation features for multi-language support
- Upload documents for processing

## ⚙️ Configuration

Create a `.env` file based on `.env.example`:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=1

# Application Settings
APP_SECRET_KEY=your-secret-key-here
DATABASE_URL=your-database-url

# Translation API (if applicable)
TRANSLATION_API_KEY=your-api-key

# PDF Processing
MAX_PDF_SIZE=10MB
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📞 Support

For questions or issues:
- Open an [Issue](https://github.com/trailmail123456/anits-college-website-/issues)
- Check existing documentation
- Review [Contributing Guidelines](CONTRIBUTING.md)

---

**Last Updated:** April 30, 2026
