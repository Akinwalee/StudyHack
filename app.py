from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({"message": "StudyHack"}, {"Status Code": 200})

if __name__ == "__main__":
    app.run(debug=True)

CORS(app)