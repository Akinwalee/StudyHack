import './Quiz.css';
import {useState, useRef} from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Quiz(){

    const location = useLocation();
    const navigate = useNavigate();
    const { quizData } = location.state || { quizData: { questions: [] } };
    

    const [quizstate, setQuizState] = useState('not start');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false); // Track if an answer has been selected
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userInput, setUserInput] = useState('');
    const listItemRefs = useRef([]);

    // const type = quizData["questions"]["questionIndex"]["type"]
    const questions = quizData.questions.map(q => q.question);
    const answers = quizData.questions.map(q => q.options);
    const correctAnswers = quizData.questions.map(q => q.correct_option || q.correct_answer);
    // const format = quizData.questions[questionIndex].type


    

    // useEffect(() =>{
    //     console.log(score);
    // }, [score]);
   



    const handleStart = () =>{
        // console.log(quizData)
        setTimeout(() => {
            setQuizState("start");
        }, 500)
        
    }

    const handleNextQuestion = () =>{

        if (questionIndex < questions.length - 1){
            setTimeout(() => {
                setQuestionIndex(prev => prev + 1);
                setAnswered(false);
                setSelectedAnswer(null);
                setUserInput('');
                resetListItemStyles();
                }, 500)
            // setQuestionIndex((prev) => (prev + 1) % questions.length);
            
        }
        else{
            setTimeout(() => {
                setQuizState('finished');
            }, 500)
            
        }
     
        // setAnswered(false);
        // setSelectedAnswer(null);
        // resetListItemStyles();
    }
    const handlePrevQuestion = () =>{
        if (questionIndex > 0) {
            setTimeout(() => {
                setQuestionIndex(prev => prev - 1);
                setAnswered(false);
                setSelectedAnswer(null);
                setUserInput();
                resetListItemStyles();
            }, 500)
            // setQuestionIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
          
        }
        
    }


    const handleCorrectAnswer = (selectedId) =>{
        if(!answered){
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
        // setSelectedAnswer(selectedAnswer)
        
        
    }

    const handleClozeAnswer = () => {
       
        if (!answered) {
            const correctAnswer = correctAnswers[questionIndex].toLowerCase();
            if (userInput.trim().toLowerCase () === correctAnswer) {
                setTimeout(() => {
                    setScore(prevScore => prevScore + 1);
                }, 500)
                
            }
            setAnswered(true);
        }
    }

    const resetQuiz = () => {
        setTimeout(() => {
            setQuizState('not start');
            setQuestionIndex(0);
            setScore(0);
            setAnswered(false);
            setSelectedAnswer(null);
            setUserInput('');
            resetListItemStyles()
        }, 500)
        
    };

    // const resetListItemStyles = () => {
    //     listItemRefs.current.forEach(li => {
    //         if (li) {
    //             li.style.backgroundColor = '';
    //         }
    //     });
    // };

    const resetListItemStyles = () => {
        listItemRefs.current.forEach(li => {
            if (li) {
                li.classList.remove('correct', 'incorrect');
            }
        });
    };

    const goHome = () => {
        setTimeout(() => {
            navigate('/')
        }, 500)
        
        // console.log(format)
    }

    
    


    return(
        <>
            <NavBar />
            <div className="quiz-container">
                <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handlePrevQuestion}>
                    <i className="fas fa-arrow-left"></i>Previous
                </div>
                {/* <div className={`btn counter ${quizstate === "start" ? "start" : " "}`}>{questionIndex + 1} / {questions.length}</div>  */}
                <div className="screen">
                    {quizstate === 'not start' && (
                        <>
                            <p className="click-to-start">Click the button to start Quiz</p>
                            <button className={`start-btn ${quizstate === "start" ? "hide" : " "}`} onClick={handleStart}>Start</button>
                        </>
                        )}
                    
                    {quizstate === 'start' && (
                        <>
                            <div className={`question ${quizstate === "start" ? "start" : " "}`}>
                            {/* <p className='score'>Score: {score}</p> */}
                            <p className="card-num">Question {questionIndex + 1} of {questions.length}</p>
                            <p className='quest'>{questions[questionIndex]}</p>
                            </div>

                            {quizData.questions[questionIndex].type.toLowerCase() === 'mcq' && (
                                <div className={`answers ${quizstate === "start" ? "start" : " "}`}>
                                    {/* {Object.keys(answers[questionIndex]).map((key) => (
                                        <li key={key} onClick={() => handleCorrectAnswer(answers[questionIndex][key])} className={`${selectedAnswer === answers[questionIndex][key] ? (answers[questionIndex][key] === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}>{answers[questionIndex][key]}</li>
                                    ))}; */}
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
                                <div className={`answers ${quizstate === "start" ? "start" : " "}`}>
                                    {/* {Object.keys(answers[questionIndex]).map((key) => (
                                        <li key={key} onClick={() => handleCorrectAnswer(answers[questionIndex][key])} className={`${selectedAnswer === answers[questionIndex][key] ? (answers[questionIndex][key] === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}>{answers[questionIndex][key]}</li>
                                    ))}; */}
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
                                    <button onClick={handleClozeAnswer} disabled={answered}>Submit</button>
                                </div>
                            )}

                            
                        </>
                    )}
                    {quizstate === 'finished' && (
                        <>
                            <div className="completion-screen">
                                <p>You have completed the quiz, you scored {score} out of {questions.length}</p>
                                <div className='completion-btn'>
                                    <button className="reset-btn" onClick={resetQuiz}>Retake Quiz</button>
                                    <button className="home-btn" onClick={goHome}>Go home</button>
                                </div>
                            </div> 
                        </>
                    )}
                    
                </div>
                <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handleNextQuestion}>Next<i className="fas fa-arrow-right"></i></div>
                {/* <div className={`finish ${quizstate === "start" ? "finish" : "hide"}`}>
                    <p>You have completed the quiz, you scored {score}</p>
                    <button className={`start-btn ${quizstate === "start" ? "hide" : " "}`} onClick={resetQuiz}>Start</button>
                </div> */}
                
                {/* <div className={`score ${quizstate === "start" ? "start": ""}`}>Score: {score}</div> */}

                
            
            </div>
        </>
    );
    

}

export default Quiz;