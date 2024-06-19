import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import './Dashboard.css';

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("");
    const [selectedQuestionType, setSelectedQuestionType] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedQuestionCount, setSelectedQuestionCount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const handleFile = (selectedFile) => {
        setText("");
        setFile(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
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
        setTimeout(() => {
            fileInputRef.current.click();
        }, 1000)
        
    };

    const uploadFile = async (file, options) => {
        const formData = new FormData();
        formData.append('file', file);
        Object.keys(options).forEach(key => formData.append(key, options[key]));

        try {
            const response = await fetch('http://127.0.0.1:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed!');
            }

            const result = await response.json();
            setUploadStatus(result.mesaage);
            navigate(`/${selectedFormat.toLowerCase()}`, { state : {quizData: result.data } })
        } catch (error) {
            setUploadStatus(error.mesaage);
            console.error('Error uploading file:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const uploadText = async (text, options) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            text: text,
            assessment_type: options.assessment_type,
            question_type: options.question_type,
            difficulty: options.difficulty,
            num_of_questions: options.num_of_questions
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/upload', requestOptions);

            if (!response.ok) {
                throw new Error('Text upload failed!');
            }

            const result = await response.json();
            setUploadStatus(result["mesaage"]);
            console.log(result);
            if (selectedFormat === 'Quiz'){
                navigate(`/${selectedFormat.toLowerCase()}`, { state : {quizData: result.data } })
            } else {
                navigate(`/${selectedFormat.toLowerCase()}`, { state : {quizData: result.data } })
            }
        } catch (error) {
            setUploadStatus(error.mesaage);
            console.error('Error uploading text:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateClick = () => {
        if ((file || text) && selectedFormat && selectedQuestionType && selectedDifficulty && selectedQuestionCount) {
            setIsLoading(true);

            const options = {
                assessment_type: selectedFormat.toLowerCase(),
                question_type: selectedQuestionType.toLowerCase(),
                difficulty: selectedDifficulty.toLowerCase(),
                num_of_questions: selectedQuestionCount
            };

            if (file) {
                uploadFile(file, options);
            } else {
                uploadText(text, options);
            }
        } else {
            setUploadStatus('Please fill all fields and provide either a file or text, not both.');
            setTimeout(() => {
                setUploadStatus('');
            }, 3000); 
        }
    };

    return (
        <>
            <NavBar />
            <div className="body">
                <div className="caption">
                    <div className="heading">
                        <h1>AI Quiz Maker to Generate a Quiz from PDF and Text</h1>
                        <p>Transform your pdf and text into quizzes or flashcards with StudyHack</p>
                    </div>
                    <div className="container">
                        <div
                            className="file"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            
                        >
                            <p>Drag & Drop file here</p>
                            <p>or</p>
                            <button className="click-btn" onClick={handleButtonClick}>Browse File</button>
                            <input
                                className="chooseFile"
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="file-name">
                            <h3>File Name:</h3>
                            {file && <p>{file.name}</p>}
                            {uploadStatus && <p className="mesaage">{uploadStatus}</p>}
                        </div>
                        <div className="textarea-container">
                            <textarea
                                className="textarea"
                                value={text}
                                placeholder="Paste Text you want to convert"
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="settings">
                            <div className="first">
                                <label htmlFor="format">
                                    <div>Format: </div>
                                    <select
                                        value={selectedFormat}
                                        onChange={(e) => {
                                            setSelectedFormat(e.target.value);
                                            setSelectedQuestionType("");//Reset question type when format changes
                                        }}
                                        className="format"
                                    >
                                        <option value="" disabled>Select format</option>
                                        <option value="Quiz">Quiz</option>
                                        <option value="FlashCard">FlashCard</option>
                                    </select>
                                </label>

                                <label htmlFor="questionType">
                                    <div>Question type: </div>
                                    <select
                                        value={selectedQuestionType}
                                        onChange={(e) => setSelectedQuestionType(e.target.value)}
                                        className="format"
                                    >
                                        <option value="" disabled>Select question type</option>
                                        {selectedFormat === "FlashCard" ? (
                                            <>
                                                <option value="T/F">T/F</option>
                                                <option value="Cloze">Cloze Test</option>
                                                <option value="Open">Open</option>
                                                <option value="Scenario">Scenario</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="MCQ">MCQ</option>
                                                <option value="T/F">T/F</option>
                                                <option value="Cloze">Cloze Test</option>
                                            </>
                                        )}
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
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
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
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="25">25</option>
                                        <option value="30">30</option>
                                        <option value="35">35</option>
                                        <option value="40">40</option>
                                        <option value="45">45</option>
                                        <option value="50">50</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="submit-container">
                            <button className="submit" onClick={handleGenerateClick} disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Generate Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
