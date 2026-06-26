import os

filepath = "app.py"
with open(filepath, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Add Twilio & Telegram env variables at the top
if "TWILIO_ACCOUNT_SID" not in code:
    code = code.replace("OPENAI_API_KEY = os.getenv(\"OPENAI_API_KEY\")", 
    "OPENAI_API_KEY = os.getenv(\"OPENAI_API_KEY\")\n"
    "TELEGRAM_BOT_TOKEN = os.getenv(\"TELEGRAM_BOT_TOKEN\")\n"
    "TWILIO_ACCOUNT_SID = os.getenv(\"TWILIO_ACCOUNT_SID\")\n"
    "TWILIO_AUTH_TOKEN = os.getenv(\"TWILIO_AUTH_TOKEN\")\n")

# 2. Add Telegram polling and Twilio webhook imports
if "from twilio.rest import Client" not in code:
    code = code.replace("from bs4 import BeautifulSoup", 
    "from bs4 import BeautifulSoup\n"
    "import threading\n"
    "import time\n"
    "from twilio.rest import Client\n"
    "from twilio.twiml.messaging_response import MessagingResponse\n")

# 3. Add get_embedding_model() lazy loader
lazy_loader = """
embedding_model = None
def get_embedding_model():
    global embedding_model
    if embedding_model is None:
        try:
            from fastembed import TextEmbedding
            print("Loading FastEmbed Model...")
            embedding_model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
            print("Loaded FastEmbed Model!")
        except Exception as e:
            print("Failed to load fastembed:", e)
    return embedding_model
"""
if "def get_embedding_model():" not in code:
    code = code.replace("def load_enquiries():", lazy_loader + "\n\ndef load_enquiries():")

# 4. Define the robust answer_query function (abstracted RAG pipeline)
answer_query_func = """
def answer_query(user_message, session_id="default", audio_payload=None):
    try:
        lang_code = detect(user_message) if user_message else "en"
    except:
        lang_code = "en"
        
    try:
        # Fetch history from MongoDB
        history_docs = list(db['chat_logs'].find({"session_id": session_id}).sort("timestamp", -1).limit(5))
        history_docs.reverse()
        history = []
        for doc in history_docs:
            history.append({"role": "user", "content": doc.get("user_message", "")})
            history.append({"role": "assistant", "content": doc.get("bot_reply", "")})

        # Vector Search MongoDB
        vector_context = ""
        if user_message:
            try:
                emb_model = get_embedding_model()
                if emb_model:
                    query_embedding = list(emb_model.embed([user_message]))[0].tolist()
                    pipeline = [
                        {
                            "$vectorSearch": {
                                "index": "vector_index",
                                "path": "embedding",
                                "queryVector": query_embedding,
                                "numCandidates": 50,
                                "limit": 4
                            }
                        },
                        {
                            "$project": {
                                "_id": 0,
                                "text": 1,
                                "type": 1,
                                "score": { "$meta": "vectorSearchScore" }
                            }
                        }
                    ]
                    results = list(db['knowledge_base'].aggregate(pipeline))
                    vector_chunks = [res.get('text', '') for res in results]
                    vector_context = "\\n\\n".join(vector_chunks)
            except Exception as e:
                print(f"Vector search failed: {e}")

        # Fallback Contexts
        pdf_context = extract_text_from_pdfs()[:2000]
        official_web_context = extract_official_website_data()[:2000]
        
        # Format history for Gemini
        gemini_contents = []
        for msg in history:
            role = "user" if msg["role"] == "user" else "model"
            gemini_contents.append(types.Content(role=role, parts=[types.Part.from_text(text=msg["content"])]))
            
        user_parts = []
        if user_message:
            user_parts.append(types.Part.from_text(text=user_message))
            
        if audio_payload:
            import base64
            audio_bytes = base64.b64decode(audio_payload.split(',')[1] if ',' in audio_payload else audio_payload)
            user_parts.append(types.Part.from_bytes(data=audio_bytes, mime_type="audio/webm"))
            if not user_message:
                user_parts.append(types.Part.from_text(text="Listen to this audio and reply naturally."))
                
        gemini_contents.append(types.Content(role="user", parts=user_parts))
        
        sys_instruct = (
            "You are an incredibly smart, highly capable General Intelligence AI and the official Assistant for ANITS College. "
            "Act as a friendly, helpful, and concise conversational assistant. "
            "You actively fetch live internet data when asked about current events, global knowledge, or anything outside the provided college dataset. "
            "Use your built-in Google Search tool to answer anything the user asks you about the real world! "
            "For ANITS-specific questions, heavily rely on the 'Vector Search Data' which contains the most relevant college information. "
            "CRITICAL INSTRUCTION FOR FORMATTING: Do NOT output raw asterisk lists or em dashes. Use proper cleanly formatted paragraphs, or numbered lists (1. 2. 3.). "
            "CRITICAL INSTRUCTION FOR ANONYMITY: Never mention internal file names, vector DBs, or say 'according to the scraped data'. Synthesize the information naturally as if you are a human college expert speaking directly to a student! "
            "Maintain context from the conversation naturally. "
            f"Current detected text language code: '{lang_code}'. Reply natively if it is non-English.\\n\\n"
            f"Vector Search Data (HIGHLY RELEVANT):\\n{vector_context}\\n\\n"
            f"Official Website Fallback Data:\\n{official_web_context}\\n\\n"
            f"PDF Documents Fallback Context:\\n{pdf_context}\\n\\n"
        )
        
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=gemini_contents,
            config=types.GenerateContentConfig(
                system_instruction=sys_instruct,
                max_output_tokens=300,
                tools=[{"google_search": {}}]
            )
        )
        bot_reply = response.text.strip()
        
        # Save to MongoDB
        try:
            db['chat_logs'].insert_one({
                "session_id": session_id,
                "user_message": user_message,
                "bot_reply": bot_reply,
                "detected_language": lang_code,
                "timestamp": datetime.utcnow()
            })
        except Exception as e:
            print("MongoDB Log error:", e)
            
        return bot_reply

    except Exception as e:
        import traceback
        trace = traceback.format_exc()
        print(f"Gemini API error: {e}\\n{trace}")
        error_str = str(e)
        if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
            return "I am currently processing too many requests (Rate Limit Reached). Please wait about 30 seconds and ask me again!"
        elif "503" in error_str or "UNAVAILABLE" in error_str:
            return "I am currently experiencing a massive surge in traffic! Please give me a few moments and try your question again."
        else:
            return "I'm sorry, I am currently experiencing technical difficulties. Please try again later."
"""
if "def answer_query(" not in code:
    code = code.replace("def chat():", answer_query_func + "\n\n@app.route(\"/chat\", methods=[\"POST\"])\n@limiter.limit(\"55 per minute\")\ndef chat():")

# 5. Rewrite `def chat():` body
import re
new_chat_body = """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing payload"}), 400
        
    user_message = data.get("message", "").strip()
    session_id = data.get("session_id", "default")
    audio_payload = data.get("audio")
    
    if not user_message and not audio_payload:
        return jsonify({"error": "Message or audio cannot be empty"}), 400
        
    if len(user_message) > 10000:
        return jsonify({"error": "Message exceeds 10000 characters limit"}), 400

    bot_reply = answer_query(user_message, session_id, audio_payload)
    return jsonify({"reply": bot_reply})
"""
chat_regex = re.compile(r'def chat\(\):.*?(?=@app\.route)', re.DOTALL)
code = chat_regex.sub(f"def chat():{new_chat_body}\n\n", code)

# 6. Add Twilio Webhook Route
twilio_route = """
@app.route("/api/whatsapp", methods=["POST"])
def whatsapp_webhook():
    incoming_msg = request.values.get('Body', '').strip()
    sender_number = request.values.get('From', '') # e.g. 'whatsapp:+14155238886'
    
    session_id = sender_number if sender_number else "whatsapp_default"
    
    bot_reply = answer_query(incoming_msg, session_id=session_id)
    
    # Twilio TwiML response
    resp = MessagingResponse()
    resp.message(bot_reply)
    
    return str(resp)
"""
if "def whatsapp_webhook():" not in code:
    code = code.replace("@app.route(\"/analytics\", methods=[\"GET\"])", twilio_route + "\n\n@app.route(\"/analytics\", methods=[\"GET\"])")

# 7. Add Telegram Polling Thread
telegram_thread = """
def telegram_polling():
    if not TELEGRAM_BOT_TOKEN:
        print("Telegram bot token not found. Skipping Telegram polling.")
        return
        
    base_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"
    offset = None
    
    print("Started Telegram Polling Thread!")
    while True:
        try:
            url = f"{base_url}/getUpdates?timeout=30"
            if offset:
                url += f"&offset={offset}"
                
            response = requests.get(url, timeout=40)
            if response.status_code == 200:
                data = response.json()
                if data.get("ok"):
                    for update in data["result"]:
                        offset = update["update_id"] + 1
                        
                        if "message" in update and "text" in update["message"]:
                            chat_id = update["message"]["chat"]["id"]
                            user_text = update["message"]["text"]
                            session_id = f"telegram_{chat_id}"
                            
                            # Type indicator
                            requests.post(f"{base_url}/sendChatAction", json={"chat_id": chat_id, "action": "typing"})
                            
                            bot_reply = answer_query(user_text, session_id=session_id)
                            
                            requests.post(f"{base_url}/sendMessage", json={
                                "chat_id": chat_id,
                                "text": bot_reply
                            })
        except Exception as e:
            print(f"Telegram polling error: {e}")
            time.sleep(5)
            
threading.Thread(target=telegram_polling, daemon=True).start()
"""
if "def telegram_polling():" not in code:
    # insert right before if __name__ == "__main__":
    code = code.replace("if __name__ == \"__main__\":", telegram_thread + "\n\nif __name__ == \"__main__\":")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(code)
print("Successfully patched app.py!")
