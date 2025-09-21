import os
try:
    import fitz  # PyMuPDF
except ImportError:
    import pymupdf as fitz
import json
from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from langdetect import detect
from googletrans import Translator
import openai
from datetime import datetime

# Load API keys from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

# Flask app
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Welcome to the ANITS Campus Assistant API!"

# Database setup
Base = declarative_base()
engine = create_engine("sqlite:///database.db")
Session = sessionmaker(bind=engine)
session = Session()

# Conversation logs table
class ChatLog(Base):
    __tablename__ = "chat_logs"
    id = Column(Integer, primary_key=True)
    user_message = Column(Text)
    bot_reply = Column(Text)
    language = Column(String(10))
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(engine)

# PDF Loader
def extract_text_from_pdfs():
    data = ""
    pdf_dir = "data/circulars"
    for file in os.listdir(pdf_dir):
        if file.endswith(".pdf"):
            with fitz.open(os.path.join(pdf_dir, file)) as doc:
                for page in doc:
                    data += page.get_text()
    return data

# Load FAQs
with open("../data/faqs.json", "r", encoding="utf-8") as f:
    faq_data = json.load(f)

translator = Translator()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    # Detect language
    lang = detect(user_message)

    # Translate to English
    translated_input = translator.translate(user_message, src=lang, dest="en").text

    # Search FAQs
    found = False
    for faq in faq_data:
        if faq["question"].lower() in translated_input.lower():
            answer = faq["answer"]
            found = True
            break
    if not found:
        # Fallback to LLM if FAQ not found
        context = extract_text_from_pdfs()
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": f"You are a campus assistant. Use this context: {context}"},
                    {"role": "user", "content": translated_input}
                ]
            )
            answer = response.choices[0].message.content
        except Exception:
            answer = "I'm not sure. Let me connect you to office staff. You can email info@anits.edu.in or call +91-891-2841111."

    # Translate answer back
    final_reply = translator.translate(answer, src="en", dest=lang).text

    # Log conversation
    log = ChatLog(user_message=user_message, bot_reply=final_reply, language=lang)
    session.add(log)
    session.commit()

    return jsonify({"reply": final_reply})

@app.route("/logs", methods=["GET"])
def get_logs():
    logs = session.query(ChatLog).all()
    log_list = [
        {
            "id": log.id,
            "user_message": log.user_message,
            "bot_reply": log.bot_reply,
            "language": log.language,
            "timestamp": log.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        }
        for log in logs
    ]
    return jsonify(log_list)

@app.route("/analytics", methods=["GET"])
def get_analytics():
    logs = session.query(ChatLog).all()
    language_count = {}
    question_count = {}
    for log in logs:
        language_count[log.language] = language_count.get(log.language, 0) + 1
        question = log.user_message.lower()
        question_count[question] = question_count.get(question, 0) + 1
    return jsonify({
        "language_usage": language_count,
        "frequent_questions": question_count
    })

@app.route("/admin")
def admin_dashboard():
    logs = session.query(ChatLog).all()
    language_count = {}
    question_count = {}
    for log in logs:
        language_count[log.language] = language_count.get(log.language, 0) + 1
        question = log.user_message.lower()
        question_count[question] = question_count.get(question, 0) + 1
    dashboard_html = '''
    <html>
    <head><title>Admin Dashboard</title></head>
    <body>
        <h1>Chatbot Logs</h1>
        <table border="1">
            <tr><th>ID</th><th>User Message</th><th>Bot Reply</th><th>Language</th><th>Timestamp</th></tr>
            {% for log in logs %}
            <tr>
                <td>{{ log.id }}</td>
                <td>{{ log.user_message }}</td>
                <td>{{ log.bot_reply }}</td>
                <td>{{ log.language }}</td>
                <td>{{ log.timestamp.strftime('%Y-%m-%d %H:%M:%S') }}</td>
            </tr>
            {% endfor %}
        </table>
        <h2>Analytics</h2>
        <h3>Language Usage</h3>
        <ul>
        {% for lang, count in language_count.items() %}
            <li>{{ lang }}: {{ count }}</li>
        {% endfor %}
        </ul>
        <h3>Frequent Questions</h3>
        <ul>
        {% for question, count in question_count.items() %}
            <li>{{ question }}: {{ count }}</li>
        {% endfor %}
        </ul>
    </body>
    </html>
    '''
    return render_template_string(dashboard_html, logs=logs, language_count=language_count, question_count=question_count)

if __name__ == "__main__":
    app.run(debug=True)
