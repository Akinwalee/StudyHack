// import React from 'react'
import { useState, useRef } from "react";
import NavBar from "./NavBar";
import './Dashboard.css';
import axios from 'axios';

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const fileInputRef = useRef();

    const handleFile = (selectedFile) => {
        setFile(selectedFile);
        uploadFile(selectedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleFile(event.dataTransfer.files);
    }

    const handleFileChange = (event) => {
        handleFile(event.target.files);
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
            setUploadStatus(error.response.data.message);
            console.error("Error uplaoding file")
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
                <textarea className="textarea">Paste Text</textarea>
            </div>
        </div>
    </div>
  )
}
