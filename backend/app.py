import os
try:
    import fitz  # PyMuPDF
except ImportError:
    import pymupdf as fitz
import json
from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from dotenv import load_dotenv
from langdetect import detect
from deep_translator import GoogleTranslator
from openai import OpenAI
import google.generativeai as genai
from datetime import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from functools import lru_cache, wraps
import jwt
from werkzeug.utils import secure_filename
import uuid
from flask import send_from_directory

# Load API keys from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-admin-key-for-anits")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "anits123")

# Initialize LLMs
client = OpenAI(api_key=OPENAI_API_KEY)
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Flask app
app = Flask(__name__)
CORS(app)

# Rate Limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

@app.route("/")
def home():
    return "Welcome to the ANITS Campus Assistant API!"

# MongoDB setup
uri = "mongodb+srv://admin:dharani1234@cluster1.bgkxmwd.mongodb.net/?appName=Cluster1"
mongo_client = None
db = None
chat_logs = None

try:
    mongo_client = MongoClient(uri, server_api=ServerApi('1'), serverSelectionTimeoutMS=5000)
    # Send a ping to confirm a successful connection
    mongo_client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db = mongo_client['anits_db']
    chat_logs = db['chat_logs']
    # Ensure indexes
    chat_logs.create_index([("language", 1), ("timestamp", -1)])
except Exception as e:
    print("MongoDB connection error:", e)
    print("App will run without database logging.")

# Syllabus Data Handling (Local JSON Fallback for reliability)
syllabus_file_path = "../data/syllabus.json"
def load_syllabus():
    if os.path.exists(syllabus_file_path):
        with open(syllabus_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_syllabus(data):
    os.makedirs(os.path.dirname(syllabus_file_path), exist_ok=True)
    with open(syllabus_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Academic Calendar Data Handling
calendar_file_path = "../data/academic_calendar.json"
def load_academic_calendar():
    if os.path.exists(calendar_file_path):
        with open(calendar_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_academic_calendar(data):
    os.makedirs(os.path.dirname(calendar_file_path), exist_ok=True)
    with open(calendar_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Time Tables Data Handling
time_tables_file_path = "../data/time_tables.json"
def load_time_tables():
    if os.path.exists(time_tables_file_path):
        with open(time_tables_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_time_tables(data):
    os.makedirs(os.path.dirname(time_tables_file_path), exist_ok=True)
    with open(time_tables_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# PDF Loader
@lru_cache(maxsize=1)
def extract_text_from_pdfs():
    data = ""
    pdf_dir = "../data/circulars"
    if not os.path.isdir(pdf_dir):
        return data
        
    for file in os.listdir(pdf_dir):
        if file.endswith(".pdf"):
            try:
                with fitz.open(os.path.join(pdf_dir, file)) as doc:
                    for page in doc:
                        data += page.get_text()
            except Exception as e:
                print(f"Error reading {file}: {e}")
    return data

# Load FAQs
faq_data = []
faq_path = "../data/faqs.json"
if os.path.exists(faq_path):
    with open(faq_path, "r", encoding="utf-8") as f:
        faq_data = json.load(f)

@lru_cache(maxsize=1000)
def translate_cached(text: str, src: str, dest: str) -> str:
    """Cache translations to reduce API calls."""
    try:
        translator = GoogleTranslator(source=src, target=dest)
        return translator.translate(text)
    except Exception as e:
        print(f"Translation error: {e}")
        return text

# Authentication Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            # Bearer <token>
            token = token.split(" ")[1] if " " in token else token
            jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        except Exception as e:
            return jsonify({"error": "Token is invalid"}), 401
        return f(*args, **kwargs)
    return decorated

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    password = data.get("password")
    
    if password == ADMIN_PASSWORD:
        token = jwt.encode(
            {"user": "admin", "exp": datetime.utcnow().timestamp() + 3600*24}, # 24 hr expire
            JWT_SECRET,
            algorithm="HS256"
        )
        return jsonify({"token": token, "message": "Login successful"})
    
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/upload_circular", methods=["POST"])
@token_required
def upload_circular():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith(".pdf"):
        filename = secure_filename(file.filename)
        pdf_dir = "../data/circulars"
        os.makedirs(pdf_dir, exist_ok=True)
        file.save(os.path.join(pdf_dir, filename))
        # Clear cache so chatbot learns new circular immediately
        extract_text_from_pdfs.cache_clear()
        return jsonify({"message": f"Successfully uploaded {filename}"})
    
    return jsonify({"error": "Only PDF files are allowed"}), 400

@app.route("/api/upload_syllabus", methods=["POST"])
@token_required
def upload_syllabus():
    academic_year = request.form.get("academic_year")
    program = request.form.get("program")
    
    if not academic_year or not program:
        return jsonify({"error": "Academic year and program are required"}), 400
        
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    if file and file.filename.endswith(".pdf"):
        # Generate unique filename to avoid overwrites
        unique_id = str(uuid.uuid4())[:8]
        filename = f"syllabus_{unique_id}_{secure_filename(file.filename)}"
        
        pdf_dir = "../data/syllabus_files"
        os.makedirs(pdf_dir, exist_ok=True)
        file.save(os.path.join(pdf_dir, filename))
        
        # Save to JSON
        syllabus_data = load_syllabus()
        new_entry = {
            "id": unique_id,
            "academic_year": academic_year,
            "program": program,
            "filename": filename,
            "upload_date": datetime.utcnow().isoformat()
        }
        syllabus_data.append(new_entry)
        save_syllabus(syllabus_data)
        
        return jsonify({"message": f"Successfully uploaded syllabus for {program}"})
        
    return jsonify({"error": "Only PDF files are allowed"}), 400

@app.route("/api/syllabus", methods=["GET"])
def get_syllabus():
    data = load_syllabus()
    return jsonify(data)

@app.route("/api/syllabus_file/<filename>")
def serve_syllabus_file(filename):
    pdf_dir = "../data/syllabus_files"
    return send_from_directory(pdf_dir, filename)

@app.route("/api/upload_policy", methods=["POST"])
@token_required
def upload_policy():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    policy_name = request.form.get("policy_name")
    
    if not policy_name:
        return jsonify({"error": "Policy name is required"}), 400
        
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    if file and file.filename.endswith(".pdf"):
        # Format the policy name to be URL-safe (e.g., "IT Policy" -> "it-policy")
        formatted_name = policy_name.lower().replace(" ", "-").replace("/", "-")
        filename = f"{formatted_name}.pdf"
        
        pdf_dir = "../data/policies"
        os.makedirs(pdf_dir, exist_ok=True)
        file.save(os.path.join(pdf_dir, filename))
        
        return jsonify({"message": f"Successfully uploaded {policy_name}"})
        
    return jsonify({"error": "Only PDF files are allowed"}), 400

@app.route("/api/policy_file/<filename>")
def serve_policy_file(filename):
    pdf_dir = "../data/policies"
    return send_from_directory(pdf_dir, filename)

@app.route("/api/upload_academic_calendar", methods=["POST"])
@token_required
def upload_academic_calendar():
    academic_year_header = request.form.get("academic_year_header")
    year = request.form.get("year")
    program = request.form.get("program")
    
    if not academic_year_header or not year or not program:
        return jsonify({"error": "Academic year header, year, and program are required"}), 400
        
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    if file and file.filename.endswith(".pdf"):
        unique_id = str(uuid.uuid4())[:8]
        filename = f"calendar_{unique_id}_{secure_filename(file.filename)}"
        
        pdf_dir = "../data/academic_calendar_files"
        os.makedirs(pdf_dir, exist_ok=True)
        file.save(os.path.join(pdf_dir, filename))
        
        calendar_data = load_academic_calendar()
        
        # We need to structure the JSON grouping by yearHeader
        # e.g., [{"yearHeader": "Academic Year 2025-26", "items": [{"year": "2025-26", "program": "UG", "filename": "..."}]}]
        
        # Find if section exists
        section = next((s for s in calendar_data if s["yearHeader"] == academic_year_header), None)
        new_item = {
            "id": unique_id,
            "year": year,
            "program": program,
            "filename": filename,
            "upload_date": datetime.utcnow().isoformat()
        }
        
        if section:
            section["items"].append(new_item)
        else:
            calendar_data.append({
                "yearHeader": academic_year_header,
                "items": [new_item]
            })
            
        save_academic_calendar(calendar_data)
        
        return jsonify({"message": f"Successfully uploaded calendar for {program}"})
        
    return jsonify({"error": "Only PDF files are allowed"}), 400

@app.route("/api/academic_calendar", methods=["GET"])
def get_academic_calendar():
    data = load_academic_calendar()
    return jsonify(data)

@app.route("/api/academic_calendar_file/<filename>")
def serve_academic_calendar_file(filename):
    pdf_dir = "../data/academic_calendar_files"
    return send_from_directory(pdf_dir, filename)

@app.route("/api/upload_time_table", methods=["POST"])
@token_required
def upload_time_table():
    department = request.form.get("department")
    
    if not department:
        return jsonify({"error": "Department name is required"}), 400
        
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    if file and file.filename.endswith(".pdf"):
        unique_id = str(uuid.uuid4())[:8]
        filename = f"timetable_{unique_id}_{secure_filename(file.filename)}"
        
        pdf_dir = "../data/time_table_files"
        os.makedirs(pdf_dir, exist_ok=True)
        file.save(os.path.join(pdf_dir, filename))
        
        time_tables_data = load_time_tables()
        
        # If department already exists, update filename, else add new
        existing_idx = next((i for i, t in enumerate(time_tables_data) if t["department"] == department), None)
        if existing_idx is not None:
            time_tables_data[existing_idx]["filename"] = filename
            time_tables_data[existing_idx]["upload_date"] = datetime.utcnow().isoformat()
        else:
            time_tables_data.append({
                "id": unique_id,
                "department": department,
                "filename": filename,
                "upload_date": datetime.utcnow().isoformat()
            })
            
        save_time_tables(time_tables_data)
        
        return jsonify({"message": f"Successfully uploaded Time Table for {department}"})
        
    return jsonify({"error": "Only PDF files are allowed"}), 400

@app.route("/api/time_tables", methods=["GET"])
def get_time_tables():
    data = load_time_tables()
    return jsonify(data)

@app.route("/api/time_table_file/<filename>")
def serve_time_table_file(filename):
    pdf_dir = "../data/time_table_files"
    return send_from_directory(pdf_dir, filename)

MAX_MESSAGE_LENGTH = 5000

@app.route("/chat", methods=["POST"])
@limiter.limit("10 per minute")
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    
    if not user_message:
        return jsonify({"error": "Message is required"}), 400
        
    if len(user_message) > MAX_MESSAGE_LENGTH:
        return jsonify({"error": "Message is too long"}), 400

    # Detect language (only for longer strings to prevent misclassification of short greetings)
    lang = "en"
    if len(user_message) > 15:
        try:
            lang = detect(user_message)
        except Exception:
            lang = "en"

    # Translate to English
    if lang != "en":
        translated_input = translate_cached(user_message, src=lang, dest="en")
    else:
        translated_input = user_message

    # Search FAQs
    found = False
    answer = ""
    for faq in faq_data:
        if faq["question"].lower() in translated_input.lower():
            answer = faq["answer"]
            found = True
            break
            
    if not found:
        # Fallback to LLM if FAQ not found
        context = extract_text_from_pdfs()
        answer = None
        
        if GEMINI_API_KEY:
            try:
                model = genai.GenerativeModel("gemini-2.5-flash")
                prompt = f"You are a helpful campus assistant for ANITS College. Use this context if relevant: {context}. Keep responses concise and helpful. DO NOT use markdown formatting (no asterisks, bold, etc). Use plain text only.\nUser: {translated_input}"
                response = model.generate_content(prompt)
                answer = response.text
            except Exception as e:
                print(f"Gemini Error: {e}")
                
        if not answer and OPENAI_API_KEY:
            try:
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": f"You are a helpful campus assistant for ANITS College. Use this context if relevant: {context}. Keep responses concise and helpful. DO NOT use markdown formatting (no asterisks, bold, etc). Use plain text only."},
                        {"role": "user", "content": translated_input}
                    ],
                    max_tokens=300
                )
                answer = response.choices[0].message.content
            except Exception as e:
                print(f"OpenAI Error: {e}")
                
        if not answer:
            answer = "I'm not sure. Let me connect you to office staff. You can email info@anits.edu.in or call +91-891-2841111."

    # Translate answer back
    if lang != "en":
        final_reply = translate_cached(answer, src="en", dest=lang)
    else:
        final_reply = answer

    # Log conversation to MongoDB
    if chat_logs is not None:
        log_doc = {
            "user_message": user_message,
            "bot_reply": final_reply,
            "language": lang,
            "timestamp": datetime.utcnow()
        }
        try:
            chat_logs.insert_one(log_doc)
        except Exception as e:
            print(f"MongoDB Insert Error: {e}")

    return jsonify({"reply": final_reply})

@app.route("/logs", methods=["GET"])
@token_required
def get_logs():
    if chat_logs is None:
        return jsonify([])
    logs = list(chat_logs.find().sort("timestamp", -1).limit(100))
    log_list = []
    for log in logs:
        log_list.append({
            "id": str(log["_id"]),
            "user_message": log.get("user_message", ""),
            "bot_reply": log.get("bot_reply", ""),
            "language": log.get("language", ""),
            "timestamp": log.get("timestamp", datetime.utcnow()).strftime("%Y-%m-%d %H:%M:%S")
        })
    return jsonify(log_list)

@app.route("/analytics", methods=["GET"])
@token_required
def get_analytics():
    if chat_logs is None:
        return jsonify({"language_usage": {}, "frequent_questions": {}})
    pipeline = [
        {"$group": {"_id": "$language", "count": {"$sum": 1}}}
    ]
    lang_stats = list(chat_logs.aggregate(pipeline))
    language_count = {doc["_id"]: doc["count"] for doc in lang_stats if doc["_id"]}
    
    # Getting frequent questions could be heavy, simplified version
    q_pipeline = [
        {"$group": {"_id": "$user_message", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    q_stats = list(chat_logs.aggregate(q_pipeline))
    question_count = {doc["_id"]: doc["count"] for doc in q_stats if doc["_id"]}
    
    return jsonify({
        "language_usage": language_count,
        "frequent_questions": question_count
    })

@app.route("/admin")
def admin_dashboard():
    if chat_logs is None:
        return "Database not connected."
    logs = list(chat_logs.find().sort("timestamp", -1).limit(50))
    
    pipeline = [{"$group": {"_id": "$language", "count": {"$sum": 1}}}]
    lang_stats = list(chat_logs.aggregate(pipeline))
    language_count = {doc["_id"]: doc["count"] for doc in lang_stats if doc["_id"]}
    
    q_pipeline = [
        {"$group": {"_id": "$user_message", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    q_stats = list(chat_logs.aggregate(q_pipeline))
    question_count = {doc["_id"]: doc["count"] for doc in q_stats if doc["_id"]}

    dashboard_html = '''
    <html>
    <head>
        <title>Admin Dashboard</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h1>Chatbot Dashboard (MongoDB)</h1>
        
        <h2>Analytics</h2>
        <div style="display: flex; gap: 50px;">
            <div>
                <h3>Language Usage</h3>
                <ul>
                {% for lang, count in language_count.items() %}
                    <li>{{ lang }}: {{ count }}</li>
                {% endfor %}
                </ul>
            </div>
            <div>
                <h3>Top Questions</h3>
                <ul>
                {% for question, count in question_count.items() %}
                    <li>{{ question }}: {{ count }}</li>
                {% endfor %}
                </ul>
            </div>
        </div>

        <h2>Recent Logs</h2>
        <table>
            <tr><th>User Message</th><th>Bot Reply</th><th>Language</th><th>Timestamp</th></tr>
            {% for log in logs %}
            <tr>
                <td>{{ log.user_message }}</td>
                <td>{{ log.bot_reply }}</td>
                <td>{{ log.language }}</td>
                <td>{{ log.timestamp.strftime('%Y-%m-%d %H:%M:%S') if log.timestamp else '' }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
    </html>
    '''
    return render_template_string(dashboard_html, logs=logs, language_count=language_count, question_count=question_count)

if __name__ == "__main__":
    app.run(debug=True)
