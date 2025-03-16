import { useState } from 'react';
import NavBar from './NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Flashcard() {
    const [state, setState] = useState('Not start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [comment, setComment] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { quizData } = location.state || { quizData: { questions: [] } };

    const questions = quizData.questions.map(q => q.question);
    const answers = quizData.questions.map(q => q.correct_option || q.correct_answer);

    const handleComment = async () => {
        try {
            const response = await fetch("https://needless-coast-nappy-house-production.pipeops.app/feedback/flash")

            if (!response.ok) {
                throw new Error("Comment not generated");
            }

            const result = await response.json();
            setComment(result["comment"]);
            setState('finished');
        } catch (error) {
            setComment(error.comment);
            console.error('Error generating comment:', error);
        }
    }

    const handleShowAnswer = () => {
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
            handleComment();
            // setState("finished");
            // setTimeout(() => {
            //     setState("finished");
            // }, 500)
            
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
            <div className="flex justify-center items-center h-screen">
                <div className="w-4/5 flex flex-col items-center justify-center h-[550px]">
                    <div className="w-4/5 rounded-lg border border-accent bg-black/[0.09] p-5 flex flex-col items-center" onClick={handleCardClick}>
                        {state === "Not start" && (
                            <div className="text-center text-white p-8">
                                <h2 className="text-4xl mb-8">Welcome to Flashcards!</h2>
                                <p className="mb-4">These flashcards are designed to help you recall information, not to assess you.</p>
                                <p className="mb-4">Once you start, you can navigate through the cards and see the answers by clicking `Show Answer`.</p>
                                <p className="mb-8">Good luck and have fun learning!</p>
                                <button className="px-4 py-2 bg-accent text-white rounded hover:opacity-80 transition-opacity" onClick={handleCardClick}>Start</button>
                            </div>
                        )}
                        
                        {state === "start" && (
                            <div className="w-full">
                                <div className="flex flex-col items-center">
                                    <p className="text-base text-white">Card {currentQuestionIndex + 1} of {questions.length}</p>
                                    <p className="text-2xl text-center text-white my-5">{showAnswer ? answers[currentQuestionIndex] : questions[currentQuestionIndex]}</p>
                                </div>
                                <div className="flex justify-between items-center text-white">
                                    <button 
                                        className={`flex items-center gap-2 ${currentQuestionIndex > 0 ? 'visible' : 'invisible'}`} 
                                        onClick={handlePrevCard}
                                    >
                                        <i className="fas fa-chevron-left"></i> Previous
                                    </button>
                                    <button className="flex items-center gap-2" onClick={handleNextCard}>
                                        Next <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {state === "finished" && (
                            <div className="text-center text-white p-8">
                                <p className="mb-8">You have reached the end, {comment}</p>
                                <div className="flex gap-4 justify-center">
                                    <button 
                                        className="px-4 py-2 bg-accent text-white rounded hover:opacity-80 transition-opacity" 
                                        onClick={resetCard}
                                    >
                                        Reset Cards
                                    </button>
                                    <button 
                                        className="px-4 py-2 bg-accent text-white rounded hover:opacity-80 transition-opacity" 
                                        onClick={goHome}
                                    >
                                        Go home
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {state === "start" && (
                        <div className="mt-8">
                            <button 
                                className={`px-4 py-2 rounded transition-colors ${showAnswer ? 'bg-accent text-white' : 'bg-transparent border border-accent text-white'}`}
                                onClick={showAnswer ? handleShowQuestion : handleShowAnswer}
                            >
                                {showAnswer ? 'Show Question' : 'Show answer'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Flashcard;

