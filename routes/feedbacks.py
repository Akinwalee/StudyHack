from flask import Blueprint, request, jsonify
from utils.api_call import feedback_flash, feedback_quiz

feedbacks = Blueprint('feedback', __name__)

# @feedbacks.route("/quiz", methods=["POST"])
# def quiz_feedback():
#     print("Reaching!")
#     data = request.get_json()
#     num_of_questions = data.get("num_of_questions")
#     score = data.get("score")
#     x = 100 * score / num_of_questions

#     return jsonify({"comment": feedback_quiz(x)}), 200

# @feedbacks.route("/flash", methods=["GET"])
# def flashcard_feedback():
#     return jsonify({"comment": feedback_flash()}), 200