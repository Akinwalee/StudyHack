# StudyHack

StudyHack is a web application that transforms your study materials into personalized assessments. Upload your documents or paste text to generate quizzes and flashcards, and get AI-powered explanations of the content. This project was a winner at a recent hackathon.

## Features

*   **Versatile Input:** Supports both file uploads (PDF) and direct text input.
*   **Customizable Assessments:** Generate quizzes or flashcards tailored to your needs.
    *   **Question Types:** Choose from multiple-choice, true/false, or open-ended questions.
    *   **Difficulty Levels:** Select from easy, medium, or hard difficulty levels.
    *   **Variable Length:** Specify the number of questions you want.
*   **AI-Powered Explanations:** Get detailed explanations of your study material.
*   **Performance Feedback:** Receive feedback on your quiz performance to identify areas for improvement.
*   **Modern and Responsive UI:** A clean and intuitive user interface built with React and Tailwind CSS.

## Tech Stack

*   **Frontend:**
    *   React
    *   Vite
    *   Tailwind CSS
    *   React Router
*   **Backend:**
    *   Flask
    *   Python
*   **APIs:**
    *   Generative AI for question generation and content explanation.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   Python and pip

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/Akinwalee/StudyHack.git
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Install Python packages**
    ```sh
    pip install -r requirements.txt
    ```
4.  **Start the frontend development server**
    ```sh
    npm run dev
    ```
5.  **Start the backend server**
    ```sh
    python app.py
    ```

## Usage

1.  **Provide Content:**
    *   Drag and drop a PDF file into the designated area.
    *   Click "Browse File" to select a file from your computer.
    *   Paste your text directly into the text area.
2.  **Generate Assessments:**
    *   Click the "Generate Now" button.
    *   In the modal that appears, select the assessment format (Quiz or Flashcard), question type, difficulty, and number of questions.
    *   Click "Continue" to generate the assessment.
3.  **Get Explanations:**
    *   Click the "Explain" button to get an AI-powered explanation of the content.

## Future Improvements

*   **Support for more file formats:** Add support for `.docx`, `.pptx`, and other common file formats.
*   **User Accounts:** Allow users to create accounts to save their assessments and track their progress over time.
*   **Spaced Repetition:** Implement a spaced repetition system for flashcards to optimize learning.
*   **Collaborative Learning:** Allow users to share their assessments with others.
