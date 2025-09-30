# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from nlp_fallback import generate_response
# from faqs import FAQS

# app = Flask(__name__)
# CORS(app)  # allow all origins for development; tighten later for production

# @app.route("/api/faq", methods=["GET"])
# def list_faqs():
#     """Return available FAQ keys (useful for frontend help)."""
#     return jsonify({"faq_keys": list(FAQS.keys())})

# @app.route("/api/chat", methods=["POST"])
# def chat():
#     """
#     POST JSON: { "message": "..." }
#     returns: { "reply": "...", "source": "rule-based|fuzzy-match|university-data|fallback" }
#     """
#     data = request.get_json(force=True)
#     message = data.get("message", "").strip()
#     if not message:
#         return jsonify({"error": "Empty message"}), 400
#     reply, source = generate_response(message)
#     return jsonify({"reply": reply, "source": source})

# @app.route("/")
# def home():
#     return "Campus Helpdesk Chatbot Backend is running."

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)

#2 - claude

# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_fallback import generate_response
from faqs import FAQS

app = Flask(__name__)
CORS(app)  # allow all origins for development; tighten later for production

@app.route("/api/faq", methods=["GET"])
def list_faqs():
    """Return available FAQ keys (useful for frontend help)."""
    return jsonify({"faq_keys": list(FAQS.keys())})

@app.route("/api/chat", methods=["POST"])
def chat():
    """
    POST JSON: { "message": "..." }
    returns: { "reply": "...", "source": "rule-based|fuzzy-match|university-data|fallback" }
    """
    data = request.get_json(force=True)
    message = data.get("message", "").strip()
    if not message:
        return jsonify({"error": "Empty message"}), 400
    reply, source = generate_response(message)
    return jsonify({"reply": reply, "source": source})

@app.route("/")
def home():
    return "Campus Helpdesk Chatbot Backend is running."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)