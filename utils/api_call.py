import pathlib
import textwrap
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from IPython.display import display
from IPython.display import Markdown
from flask import jsonify

load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

# Convert response to markdown
def to_markdown(text):
    text = text.replace("•", "  *")
    return Markdown(textwrap.indent(text, "> ", predicate=lambda _: True))

#Configure Gemini
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


def create_questions(text, assessment_type, question_type, difficulty, num_of_questions):
    # This is a placeholder template for dev purposes
    if assessment_type == "quiz":
        #MCQ question type template
        if question_type == "mcq":
            questions = json.loads(strip_json(create_mcq(text, difficulty, num_of_questions).text))
        elif question_type == "t/f":
            questions = json.loads(strip_json(create_tf(text, difficulty, num_of_questions).text))
        # Fill in the gap question type
        elif question_type == "cloze":
            questions = json.loads(strip_json(create_cloze(text, difficulty, num_of_questions).text))
        else:
            return jsonify({"error": "couldn't figure out question type"})

    elif assessment_type == "flashcard":
        if question_type == "t/f":
            questions = json.loads(strip_json(create_tf(text, difficulty, num_of_questions).text))
        elif question_type == "cloze":
            questions = json.loads(strip_json(create_cloze(text, difficulty, num_of_questions).text))
        elif question_type == "open":
            questions = json.loads(strip_json(create_open(text, difficulty, num_of_questions).text))
        elif question_type == "scenario":
            questions = json.loads(strip_json(create_scenario(text, difficulty, num_of_questions).text))
        else:
            return jsonify({"error": "Couldn't figure out the question type"})
    else:
        return jsonify({"error": "Couldn't figure out the question type"})
    
    response = create_response(questions)
    return (response)

def create_response(questions):
    return jsonify({
        "status_code": 200,
        "mesaage": "Questions successfully generated",
        "data": {
            "questions": questions
        }
    })

def strip_json(response):
    stripped_res = response.lstrip()

    if stripped_res.startswith("```json"):
        stripped_res = stripped_res[7:]  # Remove '```json '
        stripped_res = stripped_res.rstrip()

    if stripped_res.endswith("```"):
        stripped_res = stripped_res[:-3]  # Remove '```'

    return stripped_res

def create_mcq(text, difficulty, num_of_questions):

    response = model.generate_content(text + 

    """Prompt: Use the text above to generate """ + 
    str(num_of_questions) + 
    """ multiple choice questions with a difficulty level of """ + 
    str(difficulty) +
    """. Please format the generated questions as a JSON object following exactly this sample format: {"id": 1, "question": "What is the capital of France?", "type": "MCQ", "difficulty": "easy", "options": [{"id": "a", "text": "Berlin"}, {"id": "b", "text": "Madrid"}, {"id": "c", "text": "Paris"}, {"id": "d", "text": "Rome"}], "correct_option": "c"}, {"id": 2, "question": "Which is the largest planet in our solar system?", "type": "MCQ", "difficulty": "medium", "options": [{"id": "a", "text": "Earth"}, {"id": "b", "text": "Jupiter"}, {"id": "c", "text": "Mars"}, {"id": "d", "text": "Venus"}], "correct_option": "b"} """)

    return (response)

def create_tf(text, difficulty, num_of_questions):
    response = model.generate_content(text + 

    """Prompt: Use the text above to generate """ + 
    str(num_of_questions) + 
    """ True or False questions with a difficulty level of """ + 
    str(difficulty) +
    """. Please format the generated questions as a JSON object following exactly this sample format: {"id": 1, "question": "Ikeja is the capital of Lagos?", "type": "t/f", "difficulty": "easy", "options": [{"text": "True"}, {"text": "False"}], "correct_option": "True"}, {"id": 2, "question": "Mars is the largest planet in our solar system", "type": "t/f", "difficulty": "easy", "options": [{"text": "True"}, {"text": "False"}], "correct_option": "False"} """)

    return(response)

def create_cloze(text, difficulty, num_of_questions):
    response = model.generate_content(text + 

    """Prompt: Use the text above to generate """ + 
    str(num_of_questions) + 
    """ fill-in-the-gap with a difficulty level of """ + 
    str(difficulty) +
    """. Please format the generated questions as a JSON object following exactly this sample format: {"id": 1, "question": "What is the capital of Lagos?", "type": "cloze", "difficulty": "easy", "correct_option": "Ikeja"}, {"id": 2, "question": "What is the largest planet in our solar system", "type": "cloze", "difficulty": "medium", "correct_answer": "Jupiter"} """)

    return(response)

def create_open(text, difficulty, num_of_questions):
    response = model.generate_content(
    text + 
    """Prompt: Use the text above to generate """ + 
    str(num_of_questions) + 
    """ open-ended questions with a difficulty level of """ + 
    str(difficulty) +
    """. Please format the generated questions as a JSON object following exactly this sample format: {"id": 1, "question": "What is the capital of Lagos?", "type": "open", "difficulty": "easy", "correct_option": "Ikeja"}, {"id": 2, "question": "What is the largest planet in our solar system", "type": "open", "difficulty": "medium", "correct_answer": "Jupiter"} """
        )

    return(response)

def create_scenario(text, difficulty, num_of_questions):
    response = model.generate_content(
    text + 
    """Prompt: Use the text above to generate """ + 
    str(num_of_questions) + 
    """ scenario-based questions with a difficulty level of """ + 
    str(difficulty) +
    """. Please format the generated questions as a JSON object following exactly this sample format: {"id": 1, "question": "What is the capital of Lagos?", "type": "scenario", "difficulty": "easy", "correct_option": "Ikeja"}, {"id": 2, "question": "What is the largest planet in our solar system", "type": "scenario", "difficulty": "medium", "correct_answer": "Jupiter"} """
               )

    return(response)