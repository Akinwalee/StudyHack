import './Quiz.css';
import { useState } from 'react';
import NavBar from './NavBar';
import { useLocation, useNavigate } from 'react-router-dom';

function Flashcard() {
    const [state, setState] = useState('Not start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { quizData } = location.state || { quizData: { questions: [] } };

    const questions = quizData.questions.map(q => q.question);
    const answers = quizData.questions.map(q => q.correct_option || q.correct_answer);

    const handleShowAnswer = () => {
        setShowAnswer(true);
    }

    const handleNextCard = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => (prev + 1));
            setShowAnswer(false);
        } else {
            setState("finished");
        }
    }

    const startCard = () => {
        setState('start');
        setCurrentQuestionIndex(0);
        setShowAnswer(false);
    }

    const goHome = () => {
        navigate('/');
    }

    return (
        <>
            <NavBar />
            <div className="box">
                <div className="wrapper">
                    <div className="question-index">{currentQuestionIndex + 1}/{questions.length}</div>
                    <div className="card">
                        {state === "Not start" && (
                            <p>Click to Start</p>
                        )}
                        {state === "start" && (
                            <p>{showAnswer ? answers[currentQuestionIndex] : questions[currentQuestionIndex]}</p>
                        )}
                        {state === "finished" && (
                            <div className="completion-screen">
                                <p>You have reached the end, well done!!!</p>
                                <div className='completion-btn'>
                                    <button className="reset-btn" onClick={startCard}>Reset Cards</button>
                                    <button className="home-btn" onClick={goHome}>Go home</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="buttons">
                        <button onClick={startCard} className={`start ${state === "start" || state === "finished" ? "hide" : ""}`}>Start</button>
                        <div className={`navs ${state === "Not start" || state === "finished" ? "hide" : ""}`}>
                            <button className={`active ${showAnswer ? "on" : ""}`} onClick={handleShowAnswer}>Show answer</button>
                            <button className={`active ${showAnswer ? "" : "on"}`} onClick={handleNextCard}>Next card</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flashcard;

