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
    pass

def create_response(questions):
    return jsonify({
        "status_code": 20,
        "mesaage": "Questions successfully generated",
        "data": {
            "questions": questions
        }
    })