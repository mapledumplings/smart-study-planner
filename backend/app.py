from flask import Flask, jsonify
from flask_cors import CORS


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


if __name__ == "__main__":
    app.run(debug=True)
