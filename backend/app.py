from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route('/form')
def index():
    return jsonify({"message": "StudyHack"})

@app.route('/quiz')
def quiz():
    return jsonify({"message": "Study quizing"})

@app.route("/flash")
def flash():
    return jsonify({"message": "This is a flash card"})

if __name__ == "__main__":
    app.run(debug=True)

CORS(app)