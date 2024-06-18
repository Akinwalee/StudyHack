import './Quiz.css';
import { useState } from 'react';
import NavBar from './NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
        // setShowAnswer(true);
        setTimeout(() => {
            setShowAnswer(true);
        }, 500);
    }

    const handleShowQuestion = () => {
        setTimeout(() => {
            setShowAnswer(false);
        }, 500)
    }

    const handleNextCard = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex((prev) => (prev + 1));
                setShowAnswer(false);
            }, 500)
            
        } else {
            setTimeout(() => {
                setState("finished");
            }, 500)
            
        }
    }

    const handlePrevCard = () => {
        if (currentQuestionIndex > 0) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev - 1);
                setShowAnswer(false)
            }, 500)
            
        }
    }

    const startCard = () => {
        setTimeout(() => {
            setState('start');
            setCurrentQuestionIndex(0);
            setShowAnswer(false);
        }, 500)
        
    }

    const handleCardClick = () => {
        if (state === 'Not start') {
            startCard();
        }
    }

    const resetCard = () => {
        setTimeout(() => {
            setState('Not start');
        }, 500)
        
    }

    const goHome = () => {
        setTimeout(() => {
            navigate('/');
        }, 500)
        
    }

    return (
        <>
            <NavBar />
            <div className="box">
                <div className="wrapper">
                    

                    {/* <div className="question-index">{currentQuestionIndex + 1}/{questions.length}</div> */}
                    <div className="card" onClick={handleCardClick}>
                        
                        {state === "Not start" && (
                             <div className='not-start-card'>
                                <h2>Welcome to Flashcards!</h2>
                                <p>These flashcards are designed to help you recall information, not to assess you. Click on the card to start.</p>
                                <p>Once you start, you can navigate through the cards and see the answers by clicking `Show Answer`.</p>
                                <p>Good luck and have fun learning!</p>
                            </div>
                            
                        )}
                        {state === "start" && (
                            
                            <>
                                <div className="btn" onClick={handlePrevCard}>
                                    <i className="fas fa-arrow-left"></i>
                                </div>
                                <div className='inside-card'>
                                    <p className="num">Card {currentQuestionIndex + 1} of {questions.length}</p>
                                    <p className='question'>{showAnswer ? answers[currentQuestionIndex] : questions[currentQuestionIndex]}</p>
                                </div>
                                <div className="btn" onClick={handleNextCard}>
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </>
                        )}
                        {state === "finished" && (
                            <div className="completion-screen">
                                <p>You have reached the end, well done!!!</p>
                                <div className='completion-btn'>
                                    <button className="reset-btn" onClick={resetCard}>Reset Cards</button>
                                    <button className="home-btn" onClick={goHome}>Go home</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="buttons">
                        {/* <button onClick={startCard} className={`start ${state === "start" || state === "finished" ? "hide" : ""}`}>Start</button> */}
                        <div className={`navs ${state === "Not start" || state === "finished" ? "hide" : ""}`}>
                            {/* <button className={`active ${showAnswer ? "" : "on"}`} onClick={handlePrevCard}>Previous card</button> */}
                            {showAnswer === true ? 
                                <button className={`active ${showAnswer ? "on" : " "}`} onClick={handleShowQuestion}>Show Question</button> : 
                                <button className={`active ${showAnswer ? "on" : " "}`} onClick={handleShowAnswer}>Show answer</button>
                            }

                            {/* <button className={`active ${showAnswer ? "" : "on"}`} onClick={handleNextCard}>Next card</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flashcard;

