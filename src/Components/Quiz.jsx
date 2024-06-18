import './Quiz.css';
import {useState, useRef} from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Quiz(){


    // const correctAnswers = [
    //     "Paris",
    //     "4",
    //     "Pacific ocean",
    //     "Jupiter",
    //     "Harper Lee",
    //     "H2O",
    //     "Nile",
    //     "Leonardo da Vinci",
    //     "Vatican City",
    //     "1912",
    //     "Alexander Fleming",
    //     "Tokyo",
    //     "8"
    // ];

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
    const format = quizData.questions[questionIndex].type


    

    // useEffect(() =>{
    //     console.log(score);
    // }, [score]);
   



    const handleStart = () =>{
        // console.log(quizData)
        setQuizState("start");
    }

    const handleNextQuestion = () =>{

        if (questionIndex < questions.length - 1){
            // setQuestionIndex((prev) => (prev + 1) % questions.length);
            setQuestionIndex(prev => prev + 1);
            setAnswered(false);
            setSelectedAnswer(null);
            setUserInput('');
            resetListItemStyles();
        }
        else{
            setQuizState('finished');
        }
     
        // setAnswered(false);
        // setSelectedAnswer(null);
        // resetListItemStyles();
    }
    const handlePrevQuestion = () =>{
        if (questionIndex > 0) {
            // setQuestionIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
            setQuestionIndex(prev => prev - 1);
            // setAnswered(true);
            setAnswered(false);
            setSelectedAnswer(null);
            setUserInput();
            resetListItemStyles();
        }
        
    }

    // const handleCorrectAnswer = (selectedAnswer) =>{
    //     if(selectedAnswer != null){
    //         const correctAnswer = correctAnswers[questionIndex];
    //         if (selectedAnswer === correctAnswer) {
    //         setScore(prevScore => prevScore + 1);
    //         } 
    //     }
        
    //     setAnswered(true);
    // }

    const handleCorrectAnswer = (selectedId) =>{
        if(!answered){
            const correctAnswerId = correctAnswers[questionIndex];
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
                setScore(prevScore => prevScore + 1);
            }
            setAnswered(true);
        }
    }

    const resetQuiz = () => {
        setQuizState('start');
        setQuestionIndex(0);
        setScore(0);
        setAnswered(false);
        setSelectedAnswer(null);
        setUserInput('');
        resetListItemStyles()
    };

    const resetListItemStyles = () => {
        listItemRefs.current.forEach(li => {
            if (li) {
                li.style.backgroundColor = '';
            }
        });
    };

    const goHome = () => {
        navigate('/')
        console.log(format)
    }

    
    


    return(
        <>
            <NavBar />
            <div className="quiz-container">
                <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handlePrevQuestion}>Prev</div>
                <div className={`btn counter ${quizstate === "start" ? "start" : " "}`}>{questionIndex + 1} / {questions.length}</div> 
                <div className="screen">
                    {quizstate === 'not start' && (<button className={`start-btn ${quizstate === "start" ? "hide" : " "}`} onClick={handleStart}>Start</button>)}
                    
                    {quizstate === 'start' && (
                        <>
                            <div className={`question ${quizstate === "start" ? "start" : " "}`}>
                            <p className='score'>Score: {score}</p>
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
                <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handleNextQuestion}>Next</div>
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