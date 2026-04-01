# Smart Study Planner

Smart Study Planner is a full-stack student productivity project built with React and Flask. It helps students organize courses, enter upcoming assignments or exams, define how much time they can realistically study each day, and generate a simple day-by-day study schedule.

The goal of the project is to keep the experience clear and approachable while still demonstrating solid full-stack structure, clean state management, and a scheduling algorithm that is easy to explain in an interview or classroom presentation.

## Project Overview

Students often know what work is due, but not how to turn that list into a realistic plan. This project focuses on that gap.

The app currently allows a user to:

- add courses
- add study tasks with subject, type, due date, estimated hours, and difficulty
- set available study hours per day
- generate a study schedule grouped by day
- review tasks that could not be fully scheduled before the deadline

The scheduling logic is intentionally simple and readable:

- urgent tasks are prioritized first
- more difficult tasks are prioritized ahead of easier ones
- large tasks are spread across multiple days when possible
- the final result is returned as a day-by-day plan

## Features

- Clean React interface with separate components for forms, summaries, and schedule display
- Flask backend with a dedicated scheduling endpoint
- Beginner-friendly scheduling algorithm written in plain Python
- Day-by-day schedule output that is easy to scan visually
- Validation for missing inputs such as empty task lists or unavailable study hours
- Basic backend tests for scheduling behavior
- Responsive layout suitable for desktop and smaller screens

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Flask
- Flask-CORS
- Python `unittest`

## Project Structure

```text
smart-study-planner/
|-- backend/
|   |-- app.py
|   |-- scheduler.py
|   |-- requirements.txt
|   `-- tests/
|       `-- test_scheduler.py
|-- frontend/
|   |-- index.html
|   |-- package.json
|   |-- package-lock.json
|   |-- vite.config.js
|   `-- src/
|       |-- App.jsx
|       |-- App.css
|       |-- index.css
|       `-- components/
|           |-- AvailabilityForm.jsx
|           |-- CourseForm.jsx
|           |-- PlannerOverview.jsx
|           |-- ScheduleDisplay.jsx
|           `-- TaskForm.jsx
|-- .gitignore
`-- README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mapledumplings/smart-study-planner.git
cd smart-study-planner
```

### 2. Start the backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend runs at `http://127.0.0.1:5000`.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs through Vite, usually at `http://127.0.0.1:5173`.

### 4. Run backend tests

```bash
cd backend
python -m unittest discover -s tests
```

## Example Use Case

Imagine a student is taking Biology, History, and Math.

They enter:

- `Math Midterm Review`, due in 3 days, `5` estimated hours, difficulty `5`
- `History Essay`, due in 4 days, `3` estimated hours, difficulty `3`
- `Biology Assignment`, due in 5 days, `2` estimated hours, difficulty `2`
- `2.5` available study hours per day

The planner then:

- looks at which tasks are due soonest
- gives extra weight to harder tasks
- spreads large tasks across multiple days instead of placing all hours on one date
- produces a daily schedule showing what to study and for how long

Example schedule output:

- Monday: Math Midterm Review for 2.0 hours, History Essay for 0.5 hours
- Tuesday: Math Midterm Review for 2.0 hours, Biology Assignment for 0.5 hours
- Wednesday: Math Midterm Review for 1.0 hour, History Essay for 1.5 hours
- Thursday: History Essay for 1.0 hour, Biology Assignment for 1.5 hours

## Future Improvements

- Connect courses directly to task creation with a course selector
- Allow editing and deleting saved courses and tasks
- Save planner data in a database instead of React state only
- Add authentication for multiple users
- Support weekend vs weekday availability
- Add schedule export options such as PDF or calendar integration
- Improve the scheduling algorithm with breaks, priority weights, and time-block suggestions

## Why This Project Works Well As A Student Project

This project is small enough to understand quickly, but large enough to demonstrate real software engineering decisions:

- component-based frontend design
- API communication between React and Flask
- state management for user input and generated results
- algorithm design with practical tradeoffs
- test coverage for important backend logic

It is a strong foundation for a class project, portfolio project, or interview discussion because the architecture is clear and the scheduling behavior is easy to explain.
