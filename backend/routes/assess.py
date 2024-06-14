# Route to handle basic dashboard interaction and assessment settings
from flask import Blueprint, request, jsonify

assessment = Blueprint('assess', __name__)

@assessment.routes("/create", methods=["POST"])
def create_assessment():
    data = request.get_json()
    text = data.get("text")
    assessment_type = data.get("assessment_type")
    question_type = data.get("question_type")
    difficulty = data.get("difficulty")
    num_of_questions = data.get("num_of_questions")