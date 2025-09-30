# Campus Helpdesk Chatbot - Setup & Run Guide

## Prerequisites
- Python 3.7+ installed
- Node.js and npm installed
- Git (optional)

---

## 📁 Project Structure
```
campus-helpdesk/
├── backend/
│   ├── app.py
│   ├── nlp_fallback.py
│   ├── university_data.py
│   ├── faqs.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── App.css
    ├── package.json
    └── ...
```

---

## 🔧 Backend Setup

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Create virtual environment (recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Create requirements.txt
```bash
# Create a file named requirements.txt with this content:
echo "Flask==3.0.0
flask-cors==4.0.0" > requirements.txt
```

Or manually create `requirements.txt`:
```
Flask==3.0.0
flask-cors==4.0.0
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Replace nlp_fallback.py
Replace your `nlp_fallback.py` with the fixed version from the artifact above.

### 6. Run Flask server
```bash
# Make sure you're in the backend folder
python app.py

# Or on macOS/Linux:
python3 app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Running on http://0.0.0.0:5000
```

**✅ Backend is now running on port 5000**

---

## 🎨 Frontend Setup

### Open a NEW terminal (keep backend running)

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run React app
```bash
npm start
```

The app will automatically open in your browser at:
```
http://localhost:3000
```

**✅ Frontend is now running on port 3000**

---

## 🚀 Quick Start Commands

### Terminal 1 - Backend
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install Flask flask-cors
python app.py
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🧪 Testing

### Test Backend API (in a new terminal)
```bash
# Test health check
curl http://127.0.0.1:5000/

# Test chat endpoint
curl -X POST http://127.0.0.1:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "who is my CD faculty"}'

# Windows PowerShell:
Invoke-WebRequest -Uri http://127.0.0.1:5000/api/chat -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"message":"who is my CD faculty"}'
```

### Test in Browser
1. Go to `http://localhost:3000`
2. Try these queries:
   - "View my timetable"
   - "who is my CD faculty"
   - "Who is my IAI Faculty"
   - "Syllabus for IAI"
   - "Library hours"

---

## 🛑 Stopping the Application

### Stop Backend
In the backend terminal:
- Press `Ctrl + C`

### Stop Frontend
In the frontend terminal:
- Press `Ctrl + C`

### Deactivate Virtual Environment
```bash
deactivate
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (Port 5000):**
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Module Not Found Error
```bash
# Make sure virtual environment is activated
# Then reinstall:
pip install Flask flask-cors
```

### CORS Error in Browser
Make sure:
1. Backend is running on port 5000
2. `flask-cors` is installed
3. CORS is enabled in `app.py`

### Connection Refused
Check:
1. Backend server is running
2. Frontend is making requests to correct URL: `http://127.0.0.1:5000`

---

## 📝 Development Tips

### Running in Development Mode

**Backend with auto-reload:**
```bash
# Already enabled in app.py with debug=True
python app.py
```

**Frontend with hot reload:**
```bash
# Automatically enabled with npm start
npm start
```

### Check Logs

**Backend logs:** Visible in the terminal running Flask

**Frontend logs:** 
- Terminal running npm start
- Browser console (F12)

---

## 🔄 Restarting After Changes

### Backend Changes (Python files)
- Server auto-restarts with `debug=True`
- If not, `Ctrl+C` and run `python app.py` again

### Frontend Changes (JSX/CSS)
- Auto-reloads with hot module replacement
- If stuck, `Ctrl+C` and run `npm start` again

---

## 📦 Production Build

### Frontend Production Build
```bash
cd frontend
npm run build
```

Creates optimized production build in `frontend/build/` folder.

---

## 🎯 Common Commands Summary

| Task | Command |
|------|---------|
| **Start Backend** | `cd backend && python app.py` |
| **Start Frontend** | `cd frontend && npm start` |
| **Install Backend Deps** | `pip install -r requirements.txt` |
| **Install Frontend Deps** | `npm install` |
| **Test Backend** | `curl http://127.0.0.1:5000/` |
| **Stop Server** | `Ctrl + C` |
| **Activate Venv (Win)** | `venv\Scripts\activate` |
| **Activate Venv (Mac/Linux)** | `source venv/bin/activate` |

---

## ✨ You're All Set!

Your Campus Helpdesk Chatbot should now be running successfully with the fixed faculty matching! 🎉