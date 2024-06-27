from flask import Flask, jsonify
from flask_cors import CORS
from routes.upload import uploader
from routes.feedbacks import feedbacks

# Create app
app = Flask(__name__)
CORS(app)

app.register_blueprint(uploader, url_prefix="/api")
app.register_blueprint(feedbacks, url_prefix="/feedback")

if __name__ == "__main__":
    app.run(debug=True)