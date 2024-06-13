// import React from 'react'
import { useState, useRef } from "react";
import NavBar from "./NavBar";
import './Dashboard.css';
import axios from 'axios';

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
        uploadFile(selectedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFile = event.dataTransfer.files[0]
        if (droppedFile) {
            handleFile(droppedFile);
        } else {
            setFile(fileInputRef.current.files[0]);
        }
    }

    const handleFileChange = (event) => {
        handleFile(event.target.files[0]);
        setFile(fileInputRef.current.files[0].name)
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file)

        try {
            const response = await axios.post('http://localhost:5000/form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus(response.data.message);
            console.log(response)
        } catch (error) {
            setUploadStatus(error.response ? error.response.data.message : "File upload failed!");
            console.error("Error uplaoding file", error)
        }
    }

  return (
    <div>
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
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    
                    />
                </div>
                <div className="file-name">
                    <h3>File:</h3>
                    {file && <p>{file}</p>}
                    {uploadStatus && <p>{uploadStatus}</p>}
                </div>
                <textarea className="textarea" placeholder="Paste Text"></textarea>

                <div className="settings">
                    <div className="first">
                        <label htmlFor="format">
                            <div>Format: </div>
                            <select 
                                value={selectedFormat}
                                onChange={(e) => {
                                    setSelectedFormat(e.target.value)
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
                                    setSelectedQuestionType(e.target.value)
                                }}
                                className="format"
                            >
                                <option value="" disabled>Select question type</option>
                                <option value="option1">MCQ</option>
                                <option value="option2">T/F</option>
                                <option value="option2">Cloze Test</option>
                            </select>
                        </label>
                    </div>

                    <div className="second">
                        <label htmlFor="format">
                            <div>Difficulty: </div>
                            <select 
                                value={selectedDifficulty}
                                onChange={(e) => {
                                    setSelectedDifficulty(e.target.value)
                                }}
                                className="format"
                            >
                                <option value="" disabled>Select difficulty</option>
                                <option value="option1">Easy</option>
                                <option value="option2">Medium</option>
                                <option value="option2">Hard</option>
                            </select>
                        </label>

                        <label htmlFor="format">
                            <div>Question Count: </div>
                            <select 
                                value={selectedQuestionCount}
                                onChange={(e) => {
                                    setSelectedQuestionCount(e.target.value)
                                }}
                                className="format"
                            >
                                <option value="" disabled>Select no-of-questions</option>
                                <option value="option1">5</option>
                                <option value="option2">10</option>
                                <option value="option2">15</option>
                                <option value="option2">20</option>
                                <option value="option2">25</option>
                                <option value="option2">30</option>
                                <option value="option2">35</option>
                                <option value="option2">40</option>
                                <option value="option2">45</option>
                                <option value="option2">50</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="submit-container">
                    <div className="submit">Generate Now</div>
                </div>
            </div>
        </div>
    </div>
  )
}
