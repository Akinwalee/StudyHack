from flask import Blueprint, request, jsonify

uploader = Blueprint('upload', __name__)

#Route for text upload
@uploader.route("/text", methods=["POST"])
def upload_text():
    data = request.get_json
    if "text" not in data:
        return jsonify({"error": "Please input a text"}), 400
    return jsonify({"text": data[ "text" ]}), 200
