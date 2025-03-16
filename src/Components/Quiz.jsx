
import {useState, useRef} from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();
    // const quizData = location.state?.quizData || { questions: [] };
    const { quizData } = location.state || { quizData: { questions: [] } };


    const [quizstate, setQuizState] = useState('not start');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false); // Track if an answer has been selected
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [comment, setComment] = useState('')

    const listItemRefs = useRef([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    const shuffledQuestions = useRef(shuffleArray([...quizData.questions]));

    const questions = shuffledQuestions.current.map(q => q.question);
    const answers = shuffledQuestions.current.map(q => q.options);
    const correctAnswers = shuffledQuestions.current.map(q => q.correct_option || q.correct_answer);

    const handleStart = () => {
        setTimeout(() => {
            setQuizState("start");
        }, 500);
    };

    const handleComment = async (options) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            score: options.score,
            num_of_questions: options.num_of_questions
        })

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }
        
        try {
            const response = await fetch("https://needless-coast-nappy-house-production.pipeops.app/feedback/quiz", requestOptions)

            if (!response.ok) {
                throw new Error("Comment not generated");
            }

            const result = await response.json();
            setComment(result["comment"]);
            setQuizState('finished');
        } catch (error) {
            setComment(error.comment);
            console.error('Error generating comment:', error);
        }
    }

    const handleNextQuestion = () => {
        if (questionIndex < questions.length - 1) {
            setTimeout(() => {
                setQuestionIndex(prev => prev + 1);
                setAnswered(false);
                setSelectedAnswer(null);
                setUserInput('');
                resetListItemStyles();
            }, 500);
        } else {
            const options = {
                score: score,
                num_of_questions: questions.length

            }
            handleComment(options);
            // setTimeout(() => {
            //     handleComment(options);
            //     // setQuizState('finished');
            // }, 500);
        }
    };

    const handlePrevQuestion = () => {
        if (questionIndex > 0) {
            setTimeout(() => {
                setQuestionIndex(prev => prev - 1);
                setAnswered(false);
                setSelectedAnswer(null);
                setUserInput('');
                resetListItemStyles();
            }, 500);
        }
    };

    const handleCorrectAnswer = (selectedId) => {
        if (!answered) {
            const correctAnswerId = correctAnswers[questionIndex];
            listItemRefs.current.forEach((li, index) => {
                if (li) {
                    if (answers[questionIndex][index].id === correctAnswerId) {
                        li.classList.add('correct');
                    } else {
                        li.classList.add('incorrect');
                    }
                }
            });
            if (selectedId === correctAnswerId) {
                setScore(prevScore => prevScore + 1);
            }
            setSelectedAnswer(selectedId);
            setAnswered(true);
        }
    };

    const handleClozeAnswer = () => {
        if (!answered) {
            const correctAnswer = correctAnswers[questionIndex].toLowerCase();
            if (userInput.trim().toLowerCase() === correctAnswer) {
                setTimeout(() => {
                    setScore(prevScore => prevScore + 1);
                }, 500);
            }
            setAnswered(true);
        }
    };

    const resetQuiz = () => {
        setTimeout(() => {
            shuffledQuestions.current = shuffleArray([...quizData.questions])
            setQuizState('not start');
            setQuestionIndex(0);
            setScore(0);
            setAnswered(false);
            setSelectedAnswer(null);
            setUserInput('');
            resetListItemStyles();
        }, 1000);
    };

    const resetListItemStyles = () => {
        listItemRefs.current.forEach(li => {
            if (li) {
                li.classList.remove('correct', 'incorrect');
            }
        });
    };

    const clozeSubmit = () => {
        handleClozeAnswer();
        handleNextQuestion();
    };

    const goHome = () => {
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <>
            <NavBar />
            <div className="px-12 py-8">
                <div className="w-4/5 mx-auto flex flex-col items-center">
                    <div className="w-full bg-black/[0.02] border border-accent rounded-lg p-5 min-h-[300px] max-h-[90vh] relative">
                        {quizstate === 'not start' && (
                            <>
                                <p className="text-white text-xl text-center mt-10">Click the button to start Quiz</p>
                                <button 
                                    className={`px-4 py-2 bg-accent text-white rounded hover:opacity-80 transition-opacity ${quizstate === "start" ? "hidden" : ""}`} 
                                    onClick={handleStart}
                                >
                                    Start
                                </button>
                            </>
                        )}

                        <div className="w-full">
                            {quizstate === 'start' && questions.length > 0 && (
                                <>
                                    <div className="text-center text-white mb-8">
                                        <p className="text-lg mb-2">Question {questionIndex + 1} of {questions.length}</p>
                                        <p className="text-xl">{questions[questionIndex]}</p>
                                    </div>

                                    {quizData.questions[questionIndex].type.toLowerCase() === 'mcq' && (
                                        <div className="flex flex-col items-center gap-3 w-full max-w-xl mx-auto">
                                            {answers[questionIndex].map((option, index) => (
                                                <button 
                                                    key={index} 
                                                    ref={el => listItemRefs.current[index] = el}
                                                    onClick={() => handleCorrectAnswer(option.id)} 
                                                    className={`w-full p-3 text-white border border-accent rounded-lg hover:bg-black/20 transition-colors
                                                        ${selectedAnswer === option.id ? 
                                                            (option.id === correctAnswers[questionIndex] ? "bg-green-600" : "bg-red-600") 
                                                            : "bg-black/[0.06]"}`}
                                                >
                                                    {option.text}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {quizData.questions[questionIndex].type === 'cloze' && (
                                        <div className="flex flex-col items-center gap-4">
                                            <input 
                                                type="text" 
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                                placeholder="Type your answer here"
                                                className="w-full max-w-md p-3 bg-black/20 text-white rounded-lg border border-accent outline-none"
                                            />
                                            <button 
                                                onClick={clozeSubmit} 
                                                disabled={answered}
                                                className="px-4 py-2 bg-accent text-white rounded hover:opacity-80 transition-opacity disabled:opacity-50"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                            {quizstate === 'finished' && (
                                <div className="text-center text-white p-8">
                                    <p className="mb-8">{comment} you scored {score} out of {questions.length}</p>
                                    <div className="flex gap-4 justify-center">
                                        <button 
                                            className="px-4 py-2 bg-accent text-white rounded hover:opacity-80 transition-opacity"
                                            onClick={resetQuiz}
                                        >
                                            Retake Quiz
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

                        <div className="flex justify-between mt-8">
                            <button 
                                className={`flex items-center gap-2 text-white ${quizstate === "start" && questionIndex > 0 ? "visible" : "invisible"}`}
                                onClick={handlePrevQuestion}
                            >
                                <i className="fas fa-chevron-left"></i> Previous
                            </button>
                            <button 
                                className={`flex items-center gap-2 text-white ${quizstate === "start" ? "visible" : "invisible"}`}
                                onClick={handleNextQuestion}
                            >
                                Next <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quiz;

