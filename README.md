# Smart Study Planner

This is the starter project for a beginner-friendly Smart Study Planner app.

The project is split into two parts:

- `frontend/` contains a React app for the user interface.
- `backend/` contains a Flask app for the API.

Right now, this repo only includes the initial structure and starter files.
The future app will allow users to:

- enter courses
- enter assignments and exams
- set available study hours per day
- generate a study schedule

## Project Structure

```text
smart-study-planner/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── .gitignore
└── README.md
```

## Running the Project

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The frontend will run in the browser, and the backend will run on `http://127.0.0.1:5000`.

