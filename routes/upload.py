from flask import Blueprint, request, jsonify
from utils.handle_pdf import extract_text
from utils.api_call import create_questions
import logging

#Create the upload blueprint
uploader = Blueprint('upload', __name__)

# Create a logger specific to this module (upload.py)
# logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
# formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
# stream_handler = logging.StreamHandler()
# stream_handler.setFormatter(formatter)
# logger.addHandler(stream_handler)

# Route for text upload
@uploader.route("/upload", methods=["POST"])
def upload_and_create_assessment():

    # logger.info(f'Request JSON: {request.json}')

    data = None
    text = None
    
    if request.content_type.startswith("application/json"):
        data = request.get_json()
        if data and "text" in data:
            text = data["text"]
    
    # Check if file is in the request
    elif request.content_type.startswith("multipart/form-data"):
        if "file" in request.files:
            file = request.files["file"]
            if file.filename == "":
                return jsonify({"error": "No file selected"}), 400
            try:
                text = extract_text(file)
            except Exception as e:
                return jsonify({"error": str(e)}), 400
        
        data = request.form.to_dict()

    if not text:
        return jsonify({"error": "Please input text or upload a file"}), 400

    if data is None:
        return jsonify({"error": "Invalid request format"}), 400

    # Handle assessment creation
    assessment_type = data.get("assessment_type")
    question_type = data.get("question_type")
    difficulty = data.get("difficulty")
    num_of_questions = data.get("num_of_questions")

    if not all([assessment_type, question_type, difficulty, num_of_questions]):
        return jsonify({"error": "Some parameter is missing"}), 400

    #Generate questions
    try:
        questions = create_questions(text, assessment_type, question_type, difficulty, num_of_questions)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return questions, 200