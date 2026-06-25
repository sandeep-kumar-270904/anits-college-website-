import os
import requests
from bs4 import BeautifulSoup
try:
    import fitz  # PyMuPDF
except ImportError:
    import pymupdf as fitz
import json
from flask import Flask, request, jsonify, render_template_string, Response, session
from flask_cors import CORS
from dotenv import load_dotenv
from langdetect import detect
from deep_translator import GoogleTranslator
from google import genai
from google.genai import types
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
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.pool import NullPool
import csv
import io
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load API keys from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-admin-key-for-anits")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "anits123")
ALLOWED_ADMIN_EMAILS = ["trailmail123456@gmail.com", "xiaomiindia75@gmail.com"]

# Initialize LLMs
gemini_client = None
if GEMINI_API_KEY:
    gemini_client = genai.Client(api_key=GEMINI_API_KEY)

# Flask app
app = Flask(__name__)
app.secret_key = os.getenv("JWT_SECRET", "super-secret-admin-key-for-anits")

CORS(app, resources={
    r"/chat": {"origins": "*", "methods": ["POST"], "allow_headers": ["Content-Type"]},
    r"/api/*": {"origins": "*"}
})

# SQLite Database for Chat Logging
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat_logs.db'
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'poolclass': NullPool}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
sql_db = SQLAlchemy(app)

class ChatLog(sql_db.Model):
    __tablename__ = 'chat_logs'
    id = sql_db.Column(sql_db.Integer, primary_key=True)
    user_message = sql_db.Column(sql_db.Text, nullable=False)
    bot_reply = sql_db.Column(sql_db.Text, nullable=False)
    detected_language = sql_db.Column(sql_db.String(10), nullable=False)
    timestamp = sql_db.Column(sql_db.DateTime, default=datetime.utcnow)

with app.app_context():
    sql_db.create_all()

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
    enquiries_collection = db['enquiries']
    # Ensure indexes
    enquiries_collection.create_index([("timestamp", -1)])
except Exception as e:
    print("MongoDB connection error:", e)
    print("App will run without database logging.")
    enquiries_collection = None

# Enquiries Data Handling (Local JSON Fallback)
enquiries_file_path = "../data/enquiries.json"
def load_enquiries():
    if os.path.exists(enquiries_file_path):
        with open(enquiries_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_enquiries(data):
    os.makedirs(os.path.dirname(enquiries_file_path), exist_ok=True)
    with open(enquiries_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

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

# Events Data Handling
events_file_path = "../data/events.json"
def load_events():
    if os.path.exists(events_file_path):
        with open(events_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_events(data):
    os.makedirs(os.path.dirname(events_file_path), exist_ok=True)
    with open(events_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Faculty Data Handling
faculty_file_path = "../data/faculty.json"
def load_faculty():
    if os.path.exists(faculty_file_path):
        with open(faculty_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_faculty(data):
    os.makedirs(os.path.dirname(faculty_file_path), exist_ok=True)
    with open(faculty_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Placements Data Handling
placements_file_path = "../data/placements.json"
def load_placements():
    if os.path.exists(placements_file_path):
        with open(placements_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_placements(data):
    os.makedirs(os.path.dirname(placements_file_path), exist_ok=True)
    with open(placements_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Research Data Handling
research_file_path = "../data/research.json"
def load_research():
    if os.path.exists(research_file_path):
        with open(research_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_research(data):
    os.makedirs(os.path.dirname(research_file_path), exist_ok=True)
    with open(research_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Gallery Data Handling
gallery_file_path = "../data/gallery.json"
def load_gallery():
    if os.path.exists(gallery_file_path):
        with open(gallery_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_gallery(data):
    os.makedirs(os.path.dirname(gallery_file_path), exist_ok=True)
    with open(gallery_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Blogs Data Handling
blogs_file_path = "../data/blogs.json"
def load_blogs():
    if os.path.exists(blogs_file_path):
        with open(blogs_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_blogs(data):
    os.makedirs(os.path.dirname(blogs_file_path), exist_ok=True)
    with open(blogs_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Jobs Data Handling
jobs_file_path = "../data/jobs.json"
def load_jobs():
    if os.path.exists(jobs_file_path):
        with open(jobs_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_jobs(data):
    os.makedirs(os.path.dirname(jobs_file_path), exist_ok=True)
    with open(jobs_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# Alumni Data Handling
alumni_file_path = "../data/alumni.json"
def load_alumni():
    if os.path.exists(alumni_file_path):
        with open(alumni_file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_alumni(data):
    os.makedirs(os.path.dirname(alumni_file_path), exist_ok=True)
    with open(alumni_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

# PDF Loader
@lru_cache(maxsize=1)
def extract_text_from_pdfs():
    data = ""
    pdf_dirs = [
        "../data/circulars", "../data/syllabus", "../data/policies", 
        "../data/academic_calendar", "../data/time_tables"
    ]
    for pdf_dir in pdf_dirs:
        if not os.path.isdir(pdf_dir):
            continue
        for file in os.listdir(pdf_dir):
            if file.endswith(".pdf"):
                try:
                    with fitz.open(os.path.join(pdf_dir, file)) as doc:
                        for page in doc:
                            data += page.get_text()
                except Exception as e:
                    print(f"Error reading {file}: {e}")
    return data

@lru_cache(maxsize=1)
def extract_website_data():
    data = ""
    src_dirs = ["../frontend/src/pages", "../frontend/src/components", "../frontend/src/data"]
    for src_dir in src_dirs:
        if not os.path.isdir(src_dir):
            continue
        for root, _, files in os.walk(src_dir):
            for file in files:
                if file.endswith((".js", ".jsx")):
                    try:
                        with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                            data += f"\\n--- File: {file} ---\\n"
                            data += f.read()
                    except Exception as e:
                        print(f"Error reading {file}: {e}")
    return data

@lru_cache(maxsize=1)
def extract_image_data():
    if not gemini_client: return ""
    file_path = "../data/image_context.txt"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
            
    data = ""
    img_dirs = ["../data/gallery", "../data/blogs"]
    for img_dir in img_dirs:
        if not os.path.isdir(img_dir):
            continue
        for file in os.listdir(img_dir):
            if file.lower().endswith((".png", ".jpg", ".jpeg")):
                try:
                    # Upload to Gemini using File API or pass bytes directly
                    with open(os.path.join(img_dir, file), "rb") as f:
                        image_bytes = f.read()
                    response = gemini_client.models.generate_content(
                        model="gemini-2.5-flash-lite",
                        contents=[
                            types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                            "Describe this image in extreme detail and transcribe any text you see in it. This is for a college website database."
                        ]
                    )
                    data += f"\n--- Image: {file} ---\n{response.text}\n"
                except Exception as e:
                    print(f"Error processing image {file}: {e}")
                    
    # Save to file
    os.makedirs("../data", exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(data)
    return data

def perform_deep_scrape_anits_org():
    base_url = "https://anits.org"
    visited = set()
    to_visit = [base_url]
    data = ""
    
    # Simple BFS scraper, max 25 pages to avoid infinite loops
    max_pages = 25
    count = 0
    
    while to_visit and count < max_pages:
        url = to_visit.pop(0)
        if url in visited:
            continue
            
        visited.add(url)
        count += 1
        
        try:
            response = requests.get(url, timeout=10, verify=False)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                for script in soup(["script", "style"]):
                    script.extract()
                text = soup.get_text(separator=' ', strip=True)
                data += f"\n--- Official Page: {url} ---\n{text}\n"
                
                # Find links
                for link in soup.find_all("a", href=True):
                    href = link['href']
                    if href.startswith("/"):
                        href = base_url + href
                    if href.startswith(base_url) and href not in visited and "#" not in href:
                        to_visit.append(href)
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            
    # Save to file
    os.makedirs("../data", exist_ok=True)
    with open("../data/scraped_anits_org.txt", "w", encoding="utf-8") as f:
        f.write(data)
    return data

@lru_cache(maxsize=1)
def extract_official_website_data():
    file_path = "../data/scraped_anits_org.txt"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    # If not exists, do a quick fallback or perform scrape
    return perform_deep_scrape_anits_org()

# Load FAQs
faq_data = []
faq_path = "../data/faqs.json"
if os.path.exists(faq_path):
    with open(faq_path, "r", encoding="utf-8") as f:
        faq_data = json.load(f)

# Initialize TF-IDF Vectorizer for FAQs
faq_questions = []
faq_answers = []
tfidf_vectorizer = None
tfidf_matrix = None

if faq_data:
    faq_questions = [item.get("question", "") for item in faq_data]
    faq_answers = [item.get("answer", "") for item in faq_data]
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(faq_questions)

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
    email = data.get("email")
    password = data.get("password")
    
    if email not in ALLOWED_ADMIN_EMAILS:
        return jsonify({"error": "Unauthorized email address"}), 403
        
    if password == ADMIN_PASSWORD:
        token = jwt.encode(
            {"user": email, "exp": datetime.utcnow().timestamp() + 3600*24}, # 24 hr expire
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

@app.route("/api/events", methods=["GET"])
def get_events():
    data = load_events()
    return jsonify(data)

@app.route("/api/events", methods=["POST"])
@token_required
def add_event():
    data = request.get_json()
    title = data.get("title")
    date = data.get("date")
    description = data.get("description")
    
    if not title or not date or not description:
        return jsonify({"error": "Title, date, and description are required"}), 400
        
    events_data = load_events()
    new_event = {
        "id": str(uuid.uuid4())[:8],
        "title": title,
        "date": date,
        "description": description,
        "created_at": datetime.utcnow().isoformat()
    }
    events_data.append(new_event)
    save_events(events_data)
    
    return jsonify({"message": "Event added successfully", "event": new_event})

@app.route("/api/events/<event_id>", methods=["DELETE"])
@token_required
def delete_event(event_id):
    events_data = load_events()
    filtered_data = [e for e in events_data if e.get("id") != event_id]
    
    if len(filtered_data) == len(events_data):
        return jsonify({"error": "Event not found"}), 404
        
    save_events(filtered_data)
    return jsonify({"message": "Event deleted successfully"})

@app.route("/api/faculty", methods=["GET"])
def get_faculty():
    data = load_faculty()
    return jsonify(data)

@app.route("/api/faculty", methods=["POST"])
@token_required
def add_faculty():
    data = request.get_json()
    name = data.get("name")
    department = data.get("department")
    designation = data.get("designation")
    qualification = data.get("qualification", "")
    email = data.get("email", "")
    
    if not name or not department or not designation:
        return jsonify({"error": "Name, department, and designation are required"}), 400
        
    faculty_data = load_faculty()
    new_faculty = {
        "id": str(uuid.uuid4())[:8],
        "name": name,
        "department": department,
        "designation": designation,
        "qualification": qualification,
        "email": email,
        "created_at": datetime.utcnow().isoformat()
    }
    faculty_data.append(new_faculty)
    save_faculty(faculty_data)
    
    return jsonify({"message": "Faculty member added successfully", "faculty": new_faculty})

@app.route("/api/faculty/<faculty_id>", methods=["DELETE"])
@token_required
def delete_faculty(faculty_id):
    faculty_data = load_faculty()
    filtered_data = [f for f in faculty_data if f.get("id") != faculty_id]
    
    if len(filtered_data) == len(faculty_data):
        return jsonify({"error": "Faculty not found"}), 404
        
    save_faculty(filtered_data)
    return jsonify({"message": "Faculty deleted successfully"})

@app.route("/api/placements", methods=["GET"])
def get_placements():
    data = load_placements()
    return jsonify(data)

@app.route("/api/placements", methods=["POST"])
@token_required
def add_placement():
    data = request.get_json()
    year = data.get("year")
    total_offers = data.get("total_offers")
    highest_package = data.get("highest_package")
    average_package = data.get("average_package")
    total_recruiters = data.get("total_recruiters")
    
    if not year or not total_offers or not highest_package or not average_package or not total_recruiters:
        return jsonify({"error": "All placement fields are required"}), 400
        
    placements_data = load_placements()
    new_placement = {
        "id": str(uuid.uuid4())[:8],
        "year": year,
        "total_offers": total_offers,
        "highest_package": highest_package,
        "average_package": average_package,
        "total_recruiters": total_recruiters,
        "created_at": datetime.utcnow().isoformat()
    }
    placements_data.append(new_placement)
    save_placements(placements_data)
    
    return jsonify({"message": "Placement stats added successfully", "placement": new_placement})

@app.route("/api/placements/<placement_id>", methods=["DELETE"])
@token_required
def delete_placement(placement_id):
    placements_data = load_placements()
    filtered_data = [p for p in placements_data if p.get("id") != placement_id]
    
    if len(filtered_data) == len(placements_data):
        return jsonify({"error": "Placement record not found"}), 404
        
    save_placements(filtered_data)
    return jsonify({"message": "Placement record deleted successfully"})

@app.route("/api/research", methods=["GET"])
def get_research():
    data = load_research()
    return jsonify(data)

@app.route("/api/research", methods=["POST"])
@token_required
def add_research():
    data = request.get_json()
    title = data.get("title")
    authors = data.get("authors")
    journal = data.get("journal")
    year = data.get("year")
    link = data.get("link", "")
    department = data.get("department", "General")
    
    if not title or not authors or not journal or not year:
        return jsonify({"error": "Title, authors, journal, and year are required"}), 400
        
    research_data = load_research()
    new_research = {
        "id": str(uuid.uuid4())[:8],
        "title": title,
        "authors": authors,
        "journal": journal,
        "year": year,
        "link": link,
        "department": department,
        "created_at": datetime.utcnow().isoformat()
    }
    research_data.append(new_research)
    save_research(research_data)
    
    return jsonify({"message": "Research publication added successfully", "research": new_research})

@app.route("/api/research/<research_id>", methods=["DELETE"])
@token_required
def delete_research(research_id):
    research_data = load_research()
    filtered_data = [r for r in research_data if r.get("id") != research_id]
    
    if len(filtered_data) == len(research_data):
        return jsonify({"error": "Research record not found"}), 404
        
    save_research(filtered_data)
    return jsonify({"message": "Research record deleted successfully"})

@app.route("/api/upload_gallery", methods=["POST"])
@token_required
def upload_gallery():
    title = request.form.get("title")
    category = request.form.get("category", "General")
    
    if not title:
        return jsonify({"error": "Title is required"}), 400
        
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    allowed_extensions = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
    ext = os.path.splitext(file.filename)[1].lower()
    
    if ext in allowed_extensions:
        unique_id = str(uuid.uuid4())[:8]
        filename = f"gallery_{unique_id}_{secure_filename(file.filename)}"
        
        gallery_dir = "../data/gallery_files"
        os.makedirs(gallery_dir, exist_ok=True)
        file.save(os.path.join(gallery_dir, filename))
        
        gallery_data = load_gallery()
        new_item = {
            "id": unique_id,
            "title": title,
            "category": category,
            "filename": filename,
            "upload_date": datetime.utcnow().isoformat()
        }
        gallery_data.append(new_item)
        save_gallery(gallery_data)
        
        return jsonify({"message": "Successfully uploaded image", "item": new_item})
        
    return jsonify({"error": "Only image files are allowed"}), 400

@app.route("/api/gallery", methods=["GET"])
def get_gallery():
    data = load_gallery()
    return jsonify(data)

@app.route("/api/gallery_file/<filename>")
def serve_gallery_file(filename):
    gallery_dir = "../data/gallery_files"
    return send_from_directory(gallery_dir, filename)

@app.route("/api/gallery/<gallery_id>", methods=["DELETE"])
@token_required
def delete_gallery(gallery_id):
    gallery_data = load_gallery()
    filtered_data = [g for g in gallery_data if g.get("id") != gallery_id]
    
    if len(filtered_data) == len(gallery_data):
        return jsonify({"error": "Gallery item not found"}), 404
        
    # We could also delete the file here to save space, but keeping it simple for now
    save_gallery(filtered_data)
    return jsonify({"message": "Gallery item deleted successfully"})

@app.route("/api/upload_blog", methods=["POST"])
@token_required
def upload_blog():
    title = request.form.get("title")
    author = request.form.get("author", "ANITS")
    content = request.form.get("content")
    
    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400
        
    filename = None
    if "file" in request.files and request.files["file"].filename != "":
        file = request.files["file"]
        allowed_extensions = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
        ext = os.path.splitext(file.filename)[1].lower()
        if ext in allowed_extensions:
            unique_id = str(uuid.uuid4())[:8]
            filename = f"blog_{unique_id}_{secure_filename(file.filename)}"
            blog_img_dir = "../data/blog_images"
            os.makedirs(blog_img_dir, exist_ok=True)
            file.save(os.path.join(blog_img_dir, filename))
    
    blogs_data = load_blogs()
    new_blog = {
        "id": str(uuid.uuid4())[:8],
        "title": title,
        "author": author,
        "content": content,
        "image": filename,
        "created_at": datetime.utcnow().isoformat()
    }
    blogs_data.append(new_blog)
    save_blogs(blogs_data)
    
    return jsonify({"message": "Successfully published blog post", "blog": new_blog})

@app.route("/api/blogs", methods=["GET"])
def get_blogs():
    data = load_blogs()
    return jsonify(data)

@app.route("/api/blog_image/<filename>")
def serve_blog_image(filename):
    blog_img_dir = "../data/blog_images"
    return send_from_directory(blog_img_dir, filename)

@app.route("/api/blogs/<blog_id>", methods=["DELETE"])
@token_required
def delete_blog(blog_id):
    blogs_data = load_blogs()
    filtered_data = [b for b in blogs_data if b.get("id") != blog_id]
    
    if len(filtered_data) == len(blogs_data):
        return jsonify({"error": "Blog post not found"}), 404
        
    save_blogs(filtered_data)
    return jsonify({"message": "Blog post deleted successfully"})

@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    data = load_jobs()
    return jsonify(data)

@app.route("/api/jobs", methods=["POST"])
@token_required
def add_job():
    data = request.get_json()
    title = data.get("title")
    company = data.get("company")
    role = data.get("role")
    salary = data.get("salary", "Not Disclosed")
    deadline = data.get("deadline", "Rolling")
    link = data.get("link", "")
    
    if not title or not company or not role:
        return jsonify({"error": "Title, company, and role are required"}), 400
        
    jobs_data = load_jobs()
    new_job = {
        "id": str(uuid.uuid4())[:8],
        "title": title,
        "company": company,
        "role": role,
        "salary": salary,
        "deadline": deadline,
        "link": link,
        "created_at": datetime.utcnow().isoformat()
    }
    jobs_data.append(new_job)
    save_jobs(jobs_data)
    
    return jsonify({"message": "Successfully posted job", "job": new_job})

@app.route("/api/jobs/<job_id>", methods=["DELETE"])
@token_required
def delete_job(job_id):
    jobs_data = load_jobs()
    filtered_data = [j for j in jobs_data if j.get("id") != job_id]
    
    if len(filtered_data) == len(jobs_data):
        return jsonify({"error": "Job post not found"}), 404
        
    save_jobs(filtered_data)
    return jsonify({"message": "Job post deleted successfully"})

@app.route("/api/alumni", methods=["GET"])
def get_alumni():
    data = load_alumni()
    return jsonify(data)

@app.route("/api/alumni", methods=["POST"])
@limiter.limit("5 per minute")
def register_alumni():
    data = request.get_json()
    name = data.get("name")
    batch = data.get("batch")
    department = data.get("department")
    company = data.get("company")
    role = data.get("role")
    linkedin = data.get("linkedin")
    
    if not name or not batch or not department:
        return jsonify({"error": "Name, batch, and department are required"}), 400
        
    alumni_data = load_alumni()
    new_alumni = {
        "id": str(uuid.uuid4())[:8],
        "name": name,
        "batch": batch,
        "department": department,
        "company": company or "",
        "role": role or "",
        "linkedin": linkedin or "",
        "registered_at": datetime.utcnow().isoformat()
    }
    alumni_data.append(new_alumni)
    save_alumni(alumni_data)
    
    return jsonify({"message": "Alumni registered successfully", "alumni": new_alumni})

@app.route("/api/contact", methods=["POST"])
@limiter.limit("5 per minute")
def submit_contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone", "")
    subject = data.get("subject", "")
    message = data.get("message")
    
    if not name or not email or not message:
        return jsonify({"error": "Name, email, and message are required"}), 400
        
    enquiry = {
        "id": str(uuid.uuid4()),
        "name": name,
        "email": email,
        "phone": phone,
        "subject": subject,
        "message": message,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "unread"
    }
    
    # Save to MongoDB if available, else JSON fallback
    if enquiries_collection is not None:
        try:
            enquiries_collection.insert_one(enquiry)
        except Exception as e:
            print("Failed to save to MongoDB, falling back to JSON", e)
            local_data = load_enquiries()
            local_data.append(enquiry)
            save_enquiries(local_data)
    else:
        local_data = load_enquiries()
        local_data.append(enquiry)
        save_enquiries(local_data)
        
    return jsonify({"message": "Enquiry submitted successfully", "id": enquiry["id"]})

@app.route("/api/enquiries", methods=["GET"])
@token_required
def get_enquiries():
    if enquiries_collection is not None:
        try:
            enquiries = list(enquiries_collection.find().sort("timestamp", -1).limit(200))
            for eq in enquiries:
                eq["_id"] = str(eq["_id"])
            return jsonify(enquiries)
        except Exception as e:
            pass
            
    # Fallback to JSON
    data = load_enquiries()
    data = list(db.logs.find({}, {"_id": 0}))
    data.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
    return jsonify(data)

@app.route("/api/train-web", methods=["POST"])
@token_required
def train_web():
    try:
        perform_deep_scrape_anits_org()
        extract_official_website_data.cache_clear()
        extract_official_website_data() # pre-warm
        return jsonify({"message": "Deep scrape of anits.org complete."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/train-docs", methods=["POST"])
@token_required
def train_docs():
    try:
        extract_text_from_pdfs.cache_clear()
        extract_text_from_pdfs() # pre-warm
        return jsonify({"message": "PDFs and Documents processed successfully."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/train-ui", methods=["POST"])
@token_required
def train_ui():
    try:
        extract_website_data.cache_clear()
        extract_website_data() # pre-warm
        return jsonify({"message": "Local React UI Codebase indexed successfully."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


MAX_MESSAGE_LENGTH = 10000



@app.route("/chat", methods=["POST"])
@limiter.limit("55 per minute")
def chat():
    # 10. Input validation
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing payload"}), 400
        
    user_message = data.get("message", "").strip()
    has_audio = bool(data.get("audio"))
    
    if not user_message and not has_audio:
        return jsonify({"error": "Message or audio cannot be empty"}), 400
        
    if len(user_message) > 10000:
        return jsonify({"error": "Message exceeds 10000 characters limit"}), 400

    # 1. Auto language detection
    try:
        lang_code = detect(user_message) if user_message else "en"
    except:
        lang_code = "en"

    bot_reply = None

    if not bot_reply:
        try:
            # Prepare context
            pdf_context = extract_text_from_pdfs()
            official_web_context = extract_official_website_data()
            ui_code_context = extract_website_data()
            image_context = extract_image_data()
            
            # Load session history first so we can use it for RAG
            if 'chat_history' not in session:
                session['chat_history'] = []
            history = session['chat_history']
            
            # Basic RAG / Context Filtering to prevent 503 high-demand retries and extreme latency
            def get_relevant_chunks(text, query, history, chunk_size=2000, top_k=2):
                if not text: return ""
                
                # Build context-aware query by combining last user message and current query
                context_query = query
                if len(history) >= 2:
                    context_query = history[-2].get("content", "") + " " + query
                    
                query_words = set(context_query.lower().replace('?', '').replace(',', '').split())
                stop_words = {"what", "is", "the", "tell", "me", "about", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "from", "are", "they", "it", "this", "that", "these", "those", "can", "you", "show", "how", "why", "when", "where", "who", "which", "please", "do", "does", "did", "have", "has", "had", "would", "could", "should", "some"}
                query_words = query_words - stop_words
                
                if not query_words: return text[:chunk_size*top_k]
                
                chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
                
                def score(chunk):
                    chunk_lower = chunk.lower()
                    return sum(1 for w in query_words if w in chunk_lower)
                
                scored = sorted(chunks, key=score, reverse=True)
                return "\n...\n".join(scored[:top_k])

            relevant_web = get_relevant_chunks(official_web_context, user_message, history, 2500, 3)
            relevant_pdf = get_relevant_chunks(pdf_context, user_message, history, 2500, 2)
            relevant_img = get_relevant_chunks(image_context, user_message, history, 1500, 1)
            
            # Format history for Gemini
            gemini_contents = []
            # Add history (last 5 interactions = 10 messages max)
            for msg in history[-10:]:
                role = "user" if msg["role"] == "user" else "model"
                gemini_contents.append(types.Content(role=role, parts=[types.Part.from_text(text=msg["content"])]))
                
            user_parts = []
            if user_message:
                user_parts.append(types.Part.from_text(text=user_message))
                
            # If there's an audio payload, decode it and attach it!
            if "audio" in data and data["audio"]:
                import base64
                audio_bytes = base64.b64decode(data["audio"].split(',')[1] if ',' in data["audio"] else data["audio"])
                user_parts.append(types.Part.from_bytes(data=audio_bytes, mime_type="audio/webm"))
                if not user_message:
                    user_parts.append(types.Part.from_text(text="Listen to this audio and reply naturally."))
                    
            gemini_contents.append(types.Content(role="user", parts=user_parts))
            
            sys_instruct = (
                "You are an incredibly smart, highly capable General Intelligence AI and the official Assistant for ANITS College (Anil Neerukonda Institute of Technology & Sciences). "
                "Act as a friendly, helpful, and concise conversational assistant. Begin conversations politely (e.g., 'How can I help you?'). "
                "You actively fetch live internet data when asked about current events, global knowledge, or anything outside the provided college dataset. "
                "Use your built-in Google Search tool to answer anything the user asks you about the real world! "
                "For ANITS-specific questions, heavily rely on the 'Official Website Data' which contains deep-scraped real-time pages from anits.org. "
                "CRITICAL INSTRUCTION FOR FORMATTING: The user HATES raw AI symbols like asterisks (*) or em dashes (--). Do NOT output raw asterisk lists or em dashes. Use proper cleanly formatted paragraphs, or numbered lists (1. 2. 3.). "
                "CRITICAL INSTRUCTION FOR ANONYMITY: Never mention internal file names (like .jsx or .py files), PDFs, or say 'according to the scraped data'. Synthesize the information naturally as if you are a human college expert speaking directly to a student! "
                "ONLY if the user explicitly asks how you were trained or to analyze the 'Local UI Code', then you may reference the source code. Otherwise, keep your answers strictly focused on their question. "
                "Maintain context from the conversation naturally. "
                "CRITICAL INSTRUCTION FOR LANGUAGES: You natively support ALL 23 Official Languages of India (Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, Urdu, and English). "
                "If the user speaks or types to you in ANY of these languages, you MUST reply fluently in that exact same language script. "
                f"Current detected text language code: '{lang_code}'. Reply natively if it is non-English.\n\n"
                f"FAQs & Database:\n{json.dumps(faq_data)[:5000]}\n\n"
                f"Official Website Data (anits.org):\n{relevant_web}\n\n"
                f"PDF Documents Context:\n{relevant_pdf}\n\n"
                f"Images Data:\n{relevant_img}\n\n"
                f"Local UI Code (ONLY use if asked about code):\n{ui_code_context[:3000]}"
            )
            response = gemini_client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=gemini_contents,
                config=types.GenerateContentConfig(
                    system_instruction=sys_instruct,
                    max_output_tokens=300,
                    tools=[{"google_search": {}}]
                )
            )
            bot_reply = response.text.strip()
            
            # Save history
            history.append({"role": "user", "content": user_message})
            history.append({"role": "assistant", "content": bot_reply})
            # Keep only last 5 exchanges (10 messages)
            session['chat_history'] = history[-10:]
            session.modified = True
            
        except Exception as e:
            import traceback
            trace = traceback.format_exc()
            print(f"Gemini API error: {e}")
            print(trace)
            
            error_str = str(e)
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                bot_reply = "I'm currently processing too many requests (Rate Limit Reached). Please wait about 30 seconds and ask me again!"
            elif "503" in error_str or "UNAVAILABLE" in error_str:
                bot_reply = "Google's AI servers are currently experiencing unusually high demand. Please try again in a few moments!"
            else:
                bot_reply = "I'm sorry, I am currently experiencing technical difficulties. Please try again later."
                
            return jsonify({"reply": bot_reply})

    # 7. Chat logging to SQLite
    try:
        new_log = ChatLog(
            user_message=user_message,
            bot_reply=bot_reply,
            detected_language=lang_code,
            timestamp=datetime.utcnow()
        )
        sql_db.session.add(new_log)
        sql_db.session.commit()
    except Exception as e:
        print("SQLite log error:", e)
        sql_db.session.rollback()

    return jsonify({"reply": bot_reply})

@app.route("/analytics", methods=["GET"])
def analytics():
    try:
        total_messages = ChatLog.query.count()
        
        # Language breakdown
        langs = sql_db.session.query(ChatLog.detected_language, sql_db.func.count(ChatLog.id)).group_by(ChatLog.detected_language).all()
        language_breakdown = {lang: count for lang, count in langs}
        
        # Top 10 frequently asked questions
        top_questions_query = sql_db.session.query(ChatLog.user_message, sql_db.func.count(ChatLog.id)).group_by(ChatLog.user_message).order_by(sql_db.func.count(ChatLog.id).desc()).limit(10).all()
        top_questions = {q: c for q, c in top_questions_query}
        
        return jsonify({
            "total_messages": total_messages,
            "language_usage": language_breakdown,
            "top_questions": top_questions
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/admin", methods=["GET"])
def admin_dashboard():
    # 9. GET /admin dashboard inline HTML
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>ANITS Chatbot Admin</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .card { border: 1px solid #ccc; padding: 15px; margin: 10px 0; border-radius: 5px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h1>Chatbot Admin Dashboard</h1>
        <div class="card" id="stats">Loading analytics...</div>
        <a href="/export" style="display: inline-block; margin: 10px 0; padding: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Download CSV Logs</a>
        
        <script>
            fetch('/analytics')
                .then(r => r.json())
                .then(data => {
                    if(data.error) {
                        document.getElementById('stats').innerText = 'Error loading data: ' + data.error;
                        return;
                    }
                    
                    let langHtml = '<ul>' + Object.entries(data.language_usage).map(([k,v]) => `<li>${k}: ${v}</li>`).join('') + '</ul>';
                    let topQHtml = '<ul>' + Object.entries(data.top_questions).map(([k,v]) => `<li>${k} (${v} times)</li>`).join('') + '</ul>';
                    
                    document.getElementById('stats').innerHTML = `
                        <h3>Total Messages: ${data.total_messages}</h3>
                        <h4>Language Usage:</h4> ${langHtml}
                        <h4>Top 10 Questions:</h4> ${topQHtml}
                    `;
                })
                .catch(e => {
                    document.getElementById('stats').innerText = 'Fetch error: ' + e;
                });
        </script>
    </body>
    </html>
    """
    return html

@app.route("/export", methods=["GET"])
def export_logs():
    try:
        logs = ChatLog.query.order_by(ChatLog.timestamp.desc()).all()
        
        si = io.StringIO()
        cw = csv.writer(si)
        cw.writerow(['id', 'user_message', 'bot_reply', 'detected_language', 'timestamp'])
        
        for log in logs:
            cw.writerow([log.id, log.user_message, log.bot_reply, log.detected_language, log.timestamp.isoformat() if log.timestamp else ''])
            
        output = si.getvalue()
        return Response(
            output,
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment;filename=chat_logs.csv"}
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    try:
        # Check DB connection
        ChatLog.query.limit(1).all()
        return jsonify({
            "status": "ok",
            "db_connected": True,
            "timestamp": datetime.utcnow().isoformat()
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "reason": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }), 500

if __name__ == "__main__":
    import threading
    def prewarm_cache():
        print("Pre-warming caches in background...")
        try:
            extract_text_from_pdfs()
            extract_official_website_data()
            extract_website_data()
            extract_image_data()
            print("Caches pre-warmed successfully!")
        except Exception as e:
            print("Error pre-warming caches:", e)
            
    threading.Thread(target=prewarm_cache, daemon=True).start()
    
    app.run(debug=True)
