from flask import Flask, jsonify, request
from flask_cors import CORS
from scheduler import generate_study_schedule


app = Flask(__name__)

# CORS lets the React frontend call the Flask backend during development.
CORS(app)


@app.route("/api/health", methods=["GET"])
def health_check():
    """Simple route to confirm that the backend is running."""
    return jsonify(
        {
            "message": "Smart Study Planner backend is running.",
            "status": "ok",
        }
    )


@app.route("/api/schedule", methods=["POST"])
def create_schedule():
    """Generate a study schedule from the submitted tasks."""
    data = request.get_json() or {}

    tasks = data.get("tasks", [])
    available_hours_per_day = data.get("availableHoursPerDay", 0)
    start_date = data.get("startDate")

    try:
        schedule = generate_study_schedule(
            tasks=tasks,
            available_hours_per_day=float(available_hours_per_day),
            start_date=start_date,
        )
    except (KeyError, TypeError, ValueError) as error:
        return jsonify({"error": str(error)}), 400

    return jsonify(schedule)


if __name__ == "__main__":
    app.run(debug=True)
