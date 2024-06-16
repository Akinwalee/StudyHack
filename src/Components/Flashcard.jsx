import './Quiz.css';
import {useState} from 'react';
import NavBar from './NavBar';

function Flashcard(){

    const [state, setState] = useState('Not start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState('false');

    const questions = [
        "What is the capital of France?",
        "What is 2 + 2?",
        "What is the largest ocean on Earth?"
    ];

    const answers = [
        "Paris",
        "4",
        "Pacific Ocean"
    ];

    const handleShowAnswer= () =>{
        setShowAnswer(true);
    }

    const handleNextCard = () =>{
        setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
        setShowAnswer(false);
    }

    const startQuiz = () =>{
        setState('start');
        setCurrentQuestionIndex(0);
        setShowAnswer(false);
    }

    return(
        <>
            <NavBar />
            <div className="box">
            
                <div className="wrapper">
                    <div className="question-index">{currentQuestionIndex + 1}/{questions.length}</div> 
                    <div className="card">
                        <p>
                            {showAnswer ? (answers[currentQuestionIndex]) : (questions[currentQuestionIndex])}  
                        </p>
                    </div>
                
                    <div className="buttons">
                        <button onClick={startQuiz} className={`start ${state === "start" ? "hide" : ""}`}>Start</button>
                        <div className={`navs ${state === "Not start" ? "hide" : " "}`}>     
                            <button className={`active ${showAnswer === true ? "on" : " "}`} onClick={handleShowAnswer}>Show answer</button>
                            <button className={`active ${showAnswer === true ? " " : "on"}`} onClick={handleNextCard}>Next card</button>
                        </div>
                    </div>
                </div> 
            </div> 

        </>
    );

}

export default Flashcard;