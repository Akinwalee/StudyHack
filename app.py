from flask import Flask, jsonify
from flask_cors import CORS
from routes.upload import uploader

app = Flask(__name__)
CORS(app)

app.register_blueprint(uploader, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)