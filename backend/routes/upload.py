from flask import Blueprint, request, jsonify


uploader = Blueprint('upload', __name__)

#Route for text upload
@uploader.route("/text", methods=["POST"])
def upload_text():
    data = request.get_json
    if "text" not in data:
        return jsonify({"error": "Please input a text"}), 400
    return jsonify({"text": data[ "text" ]}), 200

# Route for file upload
@uploader.route("/file", methods=["POST"])
def upload_file():
    file = request.files['file']
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
    if file:
        text = extract_text(file) #extract_text() function is to be implemented seperately
        return jsonify({"text": text}), 200