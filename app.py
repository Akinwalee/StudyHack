from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({"message": "StudyHack"})

if __name__ == "__main__":
    app.run(debug=True)

CORS(app)