// import React from 'react'
import NavBar from "./NavBar"
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div>
        <NavBar />
        <div>
            <div className="heading">
                <h1>AI PDF Quiz Maker to Generate a Quiz from PDF and Text</h1>
                <p>Transform your pdf and text into quizzes or flashcards with StudyHack</p>
            </div>
            <div className="container">
                <div className="file">Choose or Drag & Drop file</div>
                <textarea className="textarea">Paste Text</textarea>
            </div>
        </div>
    </div>
  )
}
