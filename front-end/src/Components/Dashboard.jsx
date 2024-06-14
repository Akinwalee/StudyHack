
import { useState, useRef } from "react";
import NavBar from "./NavBar";
import './Dashboard.css';

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [selectedFormat, setSelectedFormat] = useState('');
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedQuestionCount, setSelectedQuestionCount] = useState('');
    const fileInputRef = useRef();

    const handleFile = (selectedFile) => {
        setFile(selectedFile);
        
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            handleFile(droppedFile);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/form', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed!');
            }

            const result = await response.json();
            setUploadStatus(result.message);
            console.log(result);
        } catch (error) {
            setUploadStatus(error.message);
            console.error('Error uploading file:', error);
        }
    };

    const handleGenerateClick = () => {
        if (file) {
            uploadFile(file);
        } else {
            setUploadStatus('Please select a file first.');
        }
    };

    return (
        <div className="body">
            <NavBar />
            <div>
                <div className="heading">
                    <h1>AI PDF Quiz Maker to Generate a Quiz from PDF and Text</h1>
                    <p>Transform your pdf and text into quizzes or flashcards with StudyHack</p>
                </div>
                <div className="container">
                    <div
                        className="file"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={handleButtonClick}
                    >
                        <p>Choose or Drag & Drop file</p>
                        <input
                            className="chooseFile"
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="file-name">
                        <h3>File:</h3>
                        {file && <p>{file.name}</p>}
                        {uploadStatus && <p>{uploadStatus}</p>}
                    </div>
                    {/* <input className="textarea" placeholder="Paste Text" type="textarea"></input> */}
                    <div
                        className="textarea"
                        contentEditable="true"
                        placeholder="Paste Text"
                    >Paste Text</div>

                    <div className="settings">
                        <div className="first">
                            <label htmlFor="format">
                                <div>Format: </div>
                                <select
                                    value={selectedFormat}
                                    onChange={(e) => {
                                        setSelectedFormat(e.target.value);
                                    }}
                                    className="format"
                                >
                                    <option value="" disabled>Select format</option>
                                    <option value="option1">Quiz</option>
                                    <option value="option2">Flash Card</option>
                                </select>
                            </label>

                            <label htmlFor="format">
                                <div>Question type: </div>
                                <select
                                    value={selectedQuestionType}
                                    onChange={(e) => {
                                        setSelectedQuestionType(e.target.value);
                                    }}
                                    className="format"
                                >
                                    <option value="" disabled>Select question type</option>
                                    <option value="option1">MCQ</option>
                                    <option value="option2">T/F</option>
                                    <option value="option3">Cloze Test</option>
                                </select>
                            </label>
                        </div>

                        <div className="second">
                            <label htmlFor="format">
                                <div>Difficulty: </div>
                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) => {
                                        setSelectedDifficulty(e.target.value);
                                    }}
                                    className="format"
                                >
                                    <option value="" disabled>Select difficulty</option>
                                    <option value="option1">Easy</option>
                                    <option value="option2">Medium</option>
                                    <option value="option3">Hard</option>
                                </select>
                            </label>

                            <label htmlFor="format">
                                <div>Question Count: </div>
                                <select
                                    value={selectedQuestionCount}
                                    onChange={(e) => {
                                        setSelectedQuestionCount(e.target.value);
                                    }}
                                    className="format"
                                >
                                    <option value="" disabled>Select question-count</option>
                                    <option value="option1">5</option>
                                    <option value="option2">10</option>
                                    <option value="option3">15</option>
                                    <option value="option4">20</option>
                                    <option value="option5">25</option>
                                    <option value="option6">30</option>
                                    <option value="option7">35</option>
                                    <option value="option8">40</option>
                                    <option value="option9">45</option>
                                    <option value="option10">50</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="submit-container">
                        <div className="submit" onClick={handleGenerateClick}>Generate Now</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

