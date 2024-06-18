from flask import Blueprint, request, jsonify

feedbacks = Blueprint("feedback", __name__)

@feedbacks.route("/quiz", method=["POST"])
def feedback_quiz():
    data = request.get_json()

    num_of_questions = data.get("num_of_questions")
    score = data.get("score")
    x = 100 * score / num_of_questions

    if x <= 25:
        pass
    elif x >25 and x <= 50:
        pass
    elif x > 50 and x <= 75:
        pass
    else:
        pass
    pass

def feedback_flashcard():
    pass