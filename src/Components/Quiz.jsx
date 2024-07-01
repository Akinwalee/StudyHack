// import './Quiz.css';
// import {useState, useRef} from 'react';
// import NavBar from './NavBar';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';


// function Quiz(){

//     const location = useLocation();
//     const navigate = useNavigate();
//     const { quizData } = location.state || { quizData: { questions: [] } };
    

//     const [quizstate, setQuizState] = useState('not start');
//     const [questionIndex, setQuestionIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [answered, setAnswered] = useState(false); // Track if an answer has been selected
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [userInput, setUserInput] = useState('');
    
//     const listItemRefs = useRef([]);

//     const questions = quizData.questions.map(q => q.question);
//     const answers = quizData.questions.map(q => q.options);
//     const correctAnswers = quizData.questions.map(q => q.correct_option || q.correct_answer);


//     const handleStart = () =>{
//         setTimeout(() => {
//             setQuizState("start");
//         }, 500)
        
//     }

//     const handleNextQuestion = () =>{

//         if (questionIndex < questions.length - 1){
//             setTimeout(() => {
//                 setQuestionIndex(prev => prev + 1);
//                 setAnswered(false);
//                 setSelectedAnswer(null);
//                 setUserInput('');
//                 resetListItemStyles();
//                 }, 500)
            
//         }
//         else{
//             setTimeout(() => {
//                 setQuizState('finished');
//             }, 500)
            
//         }
     
//     }
//     const handlePrevQuestion = () =>{
//         if (questionIndex > 0) {
//             setTimeout(() => {
//                 setQuestionIndex(prev => prev - 1);
//                 setAnswered(false);
//                 setSelectedAnswer(null);
//                 setUserInput();
//                 resetListItemStyles();
//             }, 500)
          
//         }
        
//     }


//     const handleCorrectAnswer = (selectedId) =>{
//         if(!answered){
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
        
        
//     }

//     const handleClozeAnswer = () => {
       
//         if (!answered) {
//             const correctAnswer = correctAnswers[questionIndex].toLowerCase();
//             if (userInput.trim().toLowerCase () === correctAnswer) {
//                 setTimeout(() => {
//                     setScore(prevScore => prevScore + 1);
//                 }, 500)
                
//             }
//             setAnswered(true);
//         }
//     }

//     const resetQuiz = () => {
//         setTimeout(() => {
//             setQuizState('not start');
//             setQuestionIndex(0);
//             setScore(0);
//             setAnswered(false);
//             setSelectedAnswer(null);
//             setUserInput('');
//             resetListItemStyles()
//         }, 1000)
        
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
//     }

//     const goHome = () => {
//         setTimeout(() => {
//             navigate('/')
//         }, 1000)
        
//     }

    
    


//     return(
//         <>
//             <NavBar />
//             <div className="quiz-container">
//                 <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handlePrevQuestion}>
//                     <i className="fas fa-arrow-left"></i>Previous
//                 </div>
//                 <div className="screen">
//                     {quizstate === 'not start' && (
//                         <>
//                             <p className="click-to-start">Click the button to start Quiz</p>
//                             <button className={`start-btn ${quizstate === "start" ? "hide" : " "}`} onClick={handleStart}>Start</button>
//                         </>
//                         )}
                    
//                     {quizstate === 'start' && (
//                         <>
//                             <div className={`question ${quizstate === "start" ? "start" : " "}`}>
//                             <p className="card-num">Question {questionIndex + 1} of {questions.length}</p>
//                             <p className='quest'>{questions[questionIndex]}</p>
//                             </div>

//                             {quizData.questions[questionIndex].type.toLowerCase() === 'mcq' && (
//                                 <div className={`answers ${quizstate === "start" ? "start" : " "}`}>
//                                     {answers[questionIndex].map((option, index) => (
//                                         <li 
//                                             key={index} 
//                                             ref={el => listItemRefs.current[index] = el}
//                                             onClick={() => handleCorrectAnswer(option.id)} 
//                                             className={`${selectedAnswer === option.id ? (option.id === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}
//                                         >
//                                             {option.text}
//                                         </li>
//                                     ))}
//                                 </div>
//                             )}

//                             {quizData.questions[questionIndex].type === 't/f' && (
//                                 <div className={`answers ${quizstate === "start" ? "start" : " "}`}>
//                                     {answers[questionIndex].map((option, index) => (
//                                         <li 
//                                             key={index} 
//                                             ref={el => listItemRefs.current[index] = el}
//                                             onClick={() => handleCorrectAnswer(option.text)} 
//                                             className={`${selectedAnswer === option.text ? (option.text === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}
//                                         >
//                                             {option.text}
//                                         </li>
//                                     ))}
//                                 </div>
//                             )}

//                             {quizData.questions[questionIndex].type === 'cloze' && (
//                                 <div className='cloze-answer'>
//                                     <input 
//                                         type="text" 
//                                         value={userInput}
//                                         onChange={(e) => setUserInput(e.target.value)}
//                                         placeholder='Type your answer here'
//                                         className='cloze-input'
//                                     />
//                                     <button onClick={clozeSubmit} disabled={answered}>Submit</button>
//                                 </div>
//                             )}

                            
//                         </>
//                     )}
//                     {quizstate === 'finished' && (
//                         <>
//                             <div className="completion-screen">
//                                 <p>You have completed the quiz, you scored {score} out of {questions.length}</p>
//                                 <div className='completion-btn'>
//                                     <button className="reset-btn" onClick={resetQuiz}>Retake Quiz</button>
//                                     <button className="home-btn" onClick={goHome}>Go home</button>
//                                 </div>
//                             </div> 
//                         </>
//                     )}
                    
//                 </div>
//                 <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handleNextQuestion}>Next<i className="fas fa-arrow-right"></i></div>
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

    const listItemRefs = useRef([]);

    const questions = quizData.questions.map(q => q.question);
    const answers = quizData.questions.map(q => q.options);
    const correctAnswers = quizData.questions.map(q => q.correct_option || q.correct_answer);

    const handleStart = () => {
        setTimeout(() => {
            setQuizState("start");
        }, 500);
    };

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
            setTimeout(() => {
                setQuizState('finished');
            }, 500);
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
                    <div className={`btn ${quizstate === "start" && questionIndex > 0 ? "start" : ""}`} onClick={handlePrevQuestion}>
                        <i className="fas fa-chevron-left"></i>Previous
                    </div>
                    <div className="screen">
                        {quizstate === 'not start' && (
                            <>
                                <p className="click-to-start">Click the button to start Quiz</p>
                                <button className={`start-btn ${quizstate === "start" ? "hide" : ""}`} onClick={handleStart}>Start</button>
                            </>
                        )}
                        
                        {quizstate === 'start' && questions.length > 0 && (
                            <>
                                <div className={`question ${quizstate === "start" ? "start" : ""}`}>
                                    <p className="card-num">Question {questionIndex + 1} of {questions.length}</p>
                                    <p className='quest'>{questions[questionIndex]}</p>
                                </div>

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
                        {quizstate === 'finished' && (
                            <>
                                <div className="completion-screen">
                                    <p className='completion-text'>You have completed the quiz, you scored {score} out of {questions.length}</p>
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
                    </div>
                    <div className={`btn ${quizstate === "start" ? "start" : ""}`} onClick={handleNextQuestion}>Next<i className="fas fa-chevron-right"></i></div>
                </div>
            </div>
        </>
    );
}

export default Quiz;
