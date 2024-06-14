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

#mcq
def mcq():
    pass
    #mcq implementation

#true false
def boolean():
    pass
    #Implemetation for true or false

#file upload
def handleFile():
    pass
    #handler for file upload

#text handler
def handleText():
    pass
    #Handker for text input

if __name__ == "__main__":
    app.run(debug=True)

    CORS(app)