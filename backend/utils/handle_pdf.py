import pymupdf

#I'll be using the PyMuPDF module to handle the pdf text extraction

def extract_text(file):
    doc = pymupdf.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    
    return text