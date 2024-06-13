from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/form')
def index():
    return jsonify({"message": "StudyHack"})

if __name__ == "__main__":
    app.run(debug=True)