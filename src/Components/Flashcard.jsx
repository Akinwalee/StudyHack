import './Quiz.css';
import {useState} from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function Flashcard(){

    const [state, setState] = useState('Not start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState('false');

    const location = useLocation();
    // const navigate = useNavigate();
    const { quizData } = location.state || { quizData: { questions: [] } };

    const questions = quizData.questions.map(q => q.question);
    const answers = quizData.questions.map(q => q.correct_option || q.correct_answer);
    // const answers = quizData.questions.map(q => q.options);
    // const format = quizData.questions[questionIndex].type

    // const questions = [
    //     "What is the capital of France?",
    //     "What is 2 + 2?",
    //     "What is the largest ocean on Earth?"
    // ];

    // const answers = [
    //     "Click on Start",
    //     "Paris",
    //     "4",
    //     "Pacific Ocean"
    // ];

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
        console.log(quizData.questions)
    }

    return(
        <>
            <NavBar />
            <div className="box">
            
                <div className="wrapper">
                    <div className="question-index">{currentQuestionIndex + 1}/{questions.length}</div> 
                    <div className="card">
                        <p>
                           {state === 'Not start'} {showAnswer ? (answers[currentQuestionIndex]) : (questions[currentQuestionIndex])}  
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