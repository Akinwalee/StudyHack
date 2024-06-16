import pathlib
import textwrap
import google.gerativeai as genai
from IPython.display import display
from IPython.display import Markdown

def to_markdown(text):
    text = text.replace("•", "  *")
    return Markdown(textwrap.indent(text, "> ", predicate=lambda _: True))

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")
