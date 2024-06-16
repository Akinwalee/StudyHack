import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown
from flask import jsonify
API_KEY = None

def to_markdown(text):
    text = text.replace("•", "  *")
    return Markdown(textwrap.indent(text, "> ", predicate=lambda _: True))

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


def create_questions(text, assessment_type, question_type, difficulty, num_of_questions):
    # This is a placeholder template for dev purposes
    if question_type == "mcq":
        questions = [
            {
                "id": 1,
                "question": "What is the capital of Lagos?",
                "type": "MCQ",
                "difficulty": "easy",
                "options": [
                    {"id": "a", "text": "New York"},
                    {"id": "b", "text": "Ikeja"},
                    {"id": "c", "text": "Yankee"},
                    {"id": "d", "text": "Akure"}
                ],
                "correct_option": "b"
            },
            {
                "id": 2,
                "question": "What is the largest planet in our solar system",
                "type": "MCQ",
                "difficulty": "easy",
                "options": [
                    {"id": "a", "text": "Jupiter"},
                    {"id": "b", "text": "Earth"},
                    {"id": "c", "text": "Mars"},
                    {"id": "d", "text": "Venus"}
                ],
                "correct_option": "b"
            }
        ]
    elif question_type == "t/f":
        questions = [
            {
                "id": 1,
                "question": "Ikeja is the capital of Lagos?",
                "type": "t/f",
                "difficulty": "easy",
                "options": [
                    {"text": "True"},
                    {"text": "False"}
                ],
                "correct_option": "True"
            },
            {
                "id": 2,
                "question": "Mars is the largest planet in our solar system",
                "type": "t/f",
                "difficulty": "easy",
                "options": [
                    {"text": "True"},
                    {"text": "False"}
                ],
                "correct_option": "False"
            }
        ]

    elif question_type == "cloze":
        questions = [
            {
                "id": 1,
                "question": "What is the capital of Lagos?",
                "type": "cloze",
                "difficulty": "easy",
                "correct_option": "Ikeja"
            },
            {
                "id": 2,
                "question": "What is the largest planet in our solar system",
                "type": "cloze",
                "difficulty": "medium",
                "correct_answer": "Jupiter"
            }
        ]
    response = create_response(questions)
    return (response)

def create_response(questions):
    return jsonify({
        "status_code": 20,
        "mesaage": "Questions successfully generated",
        "data": {
            "questions": questions
        }
    })