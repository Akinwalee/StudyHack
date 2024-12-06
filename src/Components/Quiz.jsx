// import './Quiz.css';
// import {useState, useRef} from 'react';
// import NavBar from './NavBar';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// function Quiz() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     // const quizData = location.state?.quizData || { questions: [] };
//     const { quizData } = location.state || { quizData: { questions: [] } };


//     const [quizstate, setQuizState] = useState('not start');
//     const [questionIndex, setQuestionIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [answered, setAnswered] = useState(false); // Track if an answer has been selected
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [userInput, setUserInput] = useState('');
//     const [comment, setComment] = useState('')

//     const listItemRefs = useRef([]);

//     const shuffleArray = (array) => {
//         for (let i = array.length - 1; i > 0; i--){
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }

//         return array;
//     }

//     const shuffledQuestions = useRef(shuffleArray([...quizData.questions]));

//     const questions = shuffledQuestions.current.map(q => q.question);
//     const answers = shuffledQuestions.current.map(q => q.options);
//     const correctAnswers = shuffledQuestions.current.map(q => q.correct_option || q.correct_answer);

//     const handleStart = () => {
//         setTimeout(() => {
//             setQuizState("start");
//         }, 500);
//     };

//     const handleComment = async (options) => {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const raw = JSON.stringify({
//             score: options.score,
//             num_of_questions: options.num_of_questions
//         })

//         const requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         }
        
//         try {
//             const response = await fetch("http://127.0.0.1:5000/feedback/quiz", requestOptions)

//             if (!response.ok) {
//                 throw new Error("Comment not generated");
//             }

//             const result = await response.json();
//             setComment(result["comment"]);
//             setQuizState('finished');
//         } catch (error) {
//             setComment(error.comment);
//             console.error('Error generating comment:', error);
//         }
//     }

//     const handleNextQuestion = () => {
//         if (questionIndex < questions.length - 1) {
//             setTimeout(() => {
//                 setQuestionIndex(prev => prev + 1);
//                 setAnswered(false);
//                 setSelectedAnswer(null);
//                 setUserInput('');
//                 resetListItemStyles();
//             }, 500);
//         } else {
//             const options = {
//                 score: score,
//                 num_of_questions: questions.length

//             }
//             handleComment(options);
//             // setTimeout(() => {
//             //     handleComment(options);
//             //     // setQuizState('finished');
//             // }, 500);
//         }
//     };

//     const handlePrevQuestion = () => {
//         if (questionIndex > 0) {
//             setTimeout(() => {
//                 setQuestionIndex(prev => prev - 1);
//                 setAnswered(false);
//                 setSelectedAnswer(null);
//                 setUserInput('');
//                 resetListItemStyles();
//             }, 500);
//         }
//     };

//     const handleCorrectAnswer = (selectedId) => {
//         if (!answered) {
//             const correctAnswerId = correctAnswers[questionIndex];
//             listItemRefs.current.forEach((li, index) => {
//                 if (li) {
//                     if (answers[questionIndex][index].id === correctAnswerId) {
//                         li.classList.add('correct');
//                     } else {
//                         li.classList.add('incorrect');
//                     }
//                 }
//             });
//             if (selectedId === correctAnswerId) {
//                 setScore(prevScore => prevScore + 1);
//             }
//             setSelectedAnswer(selectedId);
//             setAnswered(true);
//         }
//     };

//     const handleClozeAnswer = () => {
//         if (!answered) {
//             const correctAnswer = correctAnswers[questionIndex].toLowerCase();
//             if (userInput.trim().toLowerCase() === correctAnswer) {
//                 setTimeout(() => {
//                     setScore(prevScore => prevScore + 1);
//                 }, 500);
//             }
//             setAnswered(true);
//         }
//     };

//     const resetQuiz = () => {
//         setTimeout(() => {
//             shuffledQuestions.current = shuffleArray([...quizData.questions])
//             setQuizState('not start');
//             setQuestionIndex(0);
//             setScore(0);
//             setAnswered(false);
//             setSelectedAnswer(null);
//             setUserInput('');
//             resetListItemStyles();
//         }, 1000);
//     };

//     const resetListItemStyles = () => {
//         listItemRefs.current.forEach(li => {
//             if (li) {
//                 li.classList.remove('correct', 'incorrect');
//             }
//         });
//     };

//     const clozeSubmit = () => {
//         handleClozeAnswer();
//         handleNextQuestion();
//     };

//     const goHome = () => {
//         setTimeout(() => {
//             navigate('/');
//         }, 1000);
//     };

//     return (
//         <>
//             <NavBar />
//             <div className="quiz-parent-cont">
//                 <div className="quiz-container">
//                     <div className={`btn ${quizstate === "start" && questionIndex > 0 ? "start" : ""}`} onClick={handlePrevQuestion}>
//                         <i className="fas fa-chevron-left"></i>Previous
//                     </div>
//                     <div className="screen">
//                         {quizstate === 'not start' && (
//                             <>
//                                 <p className="click-to-start">Click the button to start Quiz</p>
//                                 <button className={`start-btn ${quizstate === "start" ? "hide" : ""}`} onClick={handleStart}>Start</button>
//                             </>
//                         )}
                        
//                         {quizstate === 'start' && questions.length > 0 && (
//                             <>
//                                 <div className={`question ${quizstate === "start" ? "start" : ""}`}>
//                                     <p className="card-num">Question {questionIndex + 1} of {questions.length}</p>
//                                     <p className='quest'>{questions[questionIndex]}</p>
//                                 </div>

//                                 {quizData.questions[questionIndex].type.toLowerCase() === 'mcq' && (
//                                     <div className={`answers ${quizstate === "start" ? "start" : ""}`}>
//                                         {answers[questionIndex].map((option, index) => (
//                                             <li 
//                                                 key={index} 
//                                                 ref={el => listItemRefs.current[index] = el}
//                                                 onClick={() => handleCorrectAnswer(option.id)} 
//                                                 className={`${selectedAnswer === option.id ? (option.id === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}
//                                             >
//                                                 {option.text}
//                                             </li>
//                                         ))}
//                                     </div>
//                                 )}

//                                 {quizData.questions[questionIndex].type === 't/f' && (
//                                     <div className={`answers ${quizstate === "start" ? "start" : ""}`}>
//                                         {answers[questionIndex].map((option, index) => (
//                                             <li 
//                                                 key={index} 
//                                                 ref={el => listItemRefs.current[index] = el}
//                                                 onClick={() => handleCorrectAnswer(option.text)} 
//                                                 className={`${selectedAnswer === option.text ? (option.text === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}
//                                             >
//                                                 {option.text}
//                                             </li>
//                                         ))}
//                                     </div>
//                                 )}

//                                 {quizData.questions[questionIndex].type === 'cloze' && (
//                                     <div className='cloze-answer'>
//                                         <input 
//                                             type="text" 
//                                             value={userInput}
//                                             onChange={(e) => setUserInput(e.target.value)}
//                                             placeholder='Type your answer here'
//                                             className='cloze-input'
//                                         />
//                                         <button onClick={clozeSubmit} disabled={answered}>Submit</button>
//                                     </div>
//                                 )}
//                             </>
//                         )}
//                         {quizstate === 'finished' && (
//                             <>
//                                 <div className="completion-screen">
//                                     <p className='completion-text'>{comment} you scored {score} out of {questions.length}</p>
//                                     <div className='completion-btn'>
//                                         <button className="reset-btn" onClick={resetQuiz}>Retake Quiz</button>
//                                         <button className="home-btn" onClick={goHome}>Go home</button>
//                                     </div>
//                                 </div> 
//                             </>
//                         )}
//                         {quizstate === 'start' && questions.length === 0 && (
//                             <p>No questions available.</p>
//                         )}
//                     </div>
//                     <div className={`btn ${quizstate === "start" ? "start" : ""}`} onClick={handleNextQuestion}>Next<i className="fas fa-chevron-right"></i></div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Quiz;

import './Quiz.css';
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
            <div className="quiz-parent-cont">
                <div className="quiz-container">
                    {quizstate === 'not start' && (
                        <>
                            <p className="click-to-start">Click the button to start Quiz</p>
                            <button className={`start-btn ${quizstate === "start" ? "hide" : ""}`} onClick={handleStart}>Start</button>
                        </>
                    )}


                    <div className="question-cont">
                        {quizstate === 'start' && questions.length > 0 && (
                            <div className={`question ${quizstate === "start" ? "start" : ""}`}>
                                <p className="card-num">Question {questionIndex + 1} of {questions.length}</p>
                                <p className='quest'>{questions[questionIndex]}</p>
                            </div>
                        )}
                    </div>

                    <div className="prev-and-next-btn">
                        <div className={`btn ${quizstate === "start" && questionIndex > 0 ? "start" : "dshow"}`} onClick={handlePrevQuestion}>
                            <i className="fas fa-chevron-left"></i>Previous
                        </div>
                        <div className={`btn ${quizstate === "start" ? "start" : "dshow"}`} onClick={handleNextQuestion}>Next<i className="fas fa-chevron-right"></i></div>
                    </div>

                        
                    <div className="options-cont">    
                        {quizstate === 'start' && questions.length > 0 && (
                            <>
                                {/* <div className={`question ${quizstate === "start" ? "start" : ""}`}>
                                    <p className="card-num">Question {questionIndex + 1} of {questions.length}</p>
                                    <p className='quest'>{questions[questionIndex]}</p>
                                </div> */}

                                {quizData.questions[questionIndex].type.toLowerCase() === 'mcq' && (
                                    <div className={`answers ${quizstate === "start" ? "start" : ""}`}>
                                        {answers[questionIndex].map((option, index) => (
                                            <li 
                                                key={index} 
                                                ref={el => listItemRefs.current[index] = el}
                                                onClick={() => handleCorrectAnswer(option.id)} 
                                                className={`${selectedAnswer === option.id ? (option.id === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}
                                            >
                                                {option.text}
                                            </li>
                                        ))}
                                    </div>
                                )}

                                {quizData.questions[questionIndex].type === 't/f' && (
                                    <div className={`answers ${quizstate === "start" ? "start" : ""}`}>
                                        {answers[questionIndex].map((option, index) => (
                                            <li 
                                                key={index} 
                                                ref={el => listItemRefs.current[index] = el}
                                                onClick={() => handleCorrectAnswer(option.text)} 
                                                className={`${selectedAnswer === option.text ? (option.text === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}
                                            >
                                                {option.text}
                                            </li>
                                        ))}
                                    </div>
                                )}

                                {quizData.questions[questionIndex].type === 'cloze' && (
                                    <div className='cloze-answer'>
                                        <input 
                                            type="text" 
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            placeholder='Type your answer here'
                                            className='cloze-input'
                                        />
                                        <button onClick={clozeSubmit} disabled={answered}>Submit</button>
                                    </div>
                                )}
                            </>
                        )}
                       
                    
                    </div>

                    {quizstate === 'finished' && (
                            <>
                                <div className="completion-screen">
                                    <p className='completion-text'>{comment} you scored {score} out of {questions.length}</p>
                                    <div className='completion-btn'>
                                        <button className="reset-btn" onClick={resetQuiz}>Retake Quiz</button>
                                        <button className="home-btn" onClick={goHome}>Go home</button>
                                    </div>
                                </div> 
                            </>
                        )}
                        {quizstate === 'start' && questions.length === 0 && (
                            <p>No questions available.</p>
                    )}    
                    
                        
                    {/* <div className={`btn ${quizstate === "start" ? "start" : ""}`} onClick={handleNextQuestion}>Next<i className="fas fa-chevron-right"></i></div> */}
                </div>
            </div>
        </>
    );
}

export default Quiz;

