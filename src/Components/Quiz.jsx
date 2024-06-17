import './Quiz.css';
import {useState, useRef} from 'react';

// useRef is used to manipulate the dom directly
import { useLocation } from 'react-router-dom';

function Quiz(){

    // const questions = [
    //     "What is the capital of France?",
    //     "What is 2 + 2?",
    //     "What is the largest ocean on Earth?",
    //     "What is the largest planet in our solar system?",
    //     "Who wrote 'To Kill a Mockingbird'?",
    //     "What is the chemical symbol for water?",
    //     "What is the longest river in the world?",
    //     "Who painted the Mona Lisa?",
    //     "What is the smallest country in the world by area?",
    //     "What year did the Titanic sink?",
    //     "Who discovered penicillin?",
    //     "What is the capital of Japan?",
    //     "What is the square root of 64?"
    // ]; 

    // const answers = [
    //     { A: "Paris", B: "Belgium", C: "South Africa" },
    //     { A: "4", B: "2", C: "9" },
    //     { A: "Odo-ogun", B: "Swimming pool", C: "Pacific ocean" },
    //     { A: "Jupiter", B: "Mars", C: "Earth" },
    //     { A: "Harper Lee", B: "J.K. Rowling", C: "Mark Twain" },
    //     { A: "H2O", B: "O2", C: "CO2" },
    //     { A: "Nile", B: "Amazon", C: "Yangtze" },
    //     { A: "Leonardo da Vinci", B: "Vincent van Gogh", C: "Pablo Picasso" },
    //     { A: "Vatican City", B: "Monaco", C: "San Marino" },
    //     { A: "1912", B: "1905", C: "1920" },
    //     { A: "Alexander Fleming", B: "Louis Pasteur", C: "Marie Curie" },
    //     { A: "Tokyo", B: "Kyoto", C: "Osaka" },
    //     { A: "8", B: "6", C: "10" }
    // ];

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
    const { quizData } = location.state || { quizData: { questions: [] } };
    

    const [quizstate, setQuizState] = useState('not start');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false); // Track if an answer has been selected
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const listItemRefs = useRef([]);

    // const type = quizData["questions"]["questionIndex"]["type"]
    const questions = quizData.questions.map(q => q.question);
    const answers = quizData.questions.map(q => q.options);
    const correctAnswers = quizData.questions.map(q => q.correct_option);


    

    // useEffect(() =>{
    //     console.log(score);
    // }, [score]);
   



    const handleStart = () =>{
        // console.log(quizData)
        setQuizState("start");
    }

    const handleNextQuestion = () =>{

        if (questionIndex < questions.length - 1){
            setQuestionIndex((prev) => (prev + 1) % questions.length);
        }
        else{
            setQuizState('finished');
        }
     
        setAnswered(false);
        setSelectedAnswer(null);
        resetListItemStyles();
    }
    const handlePrevQuestion = () =>{
        setQuestionIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
        // setAnswered(true);
        setAnswered(false);
        setSelectedAnswer(null);
        resetListItemStyles();
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
        }
        setSelectedAnswer(selectedAnswer)
        setAnswered(true);
        setSelectedAnswer(selectedId);
    }

    const resetQuiz = () => {
        setQuizState('start');
        setQuestionIndex(0);
        setScore(0);
        setAnswered(false);
        setSelectedAnswer(null);
    };

    const resetListItemStyles = () => {
        listItemRefs.current.forEach(li => {
            if (li) {
                li.style.backgroundColor = '';
            }
        });
    };

    
    


    return(
        <div className="container">
            <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handlePrevQuestion}>Prev</div>
            <div className={`btn counter ${quizstate === "start" ? "start" : " "}`}>{questionIndex + 1} / {questions.length}</div> 
            <div className="screen">
                <button className={`start-btn ${quizstate === "start" ? "hide" : " "}`} onClick={handleStart}>Start</button>
                <div className={`question ${quizstate === "start" ? "start" : " "}`}>
                    <p className='score'>Score: {score}</p>
                    <p className='quest'>{questions[questionIndex]}</p>
                </div>

                <div className={`answers ${quizstate === "start" ? "start" : " "}`}>
                    {/* {Object.keys(answers[questionIndex]).map((key) => (
                        <li key={key} onClick={() => handleCorrectAnswer(answers[questionIndex][key])} className={`${selectedAnswer === answers[questionIndex][key] ? (answers[questionIndex][key] === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}>{answers[questionIndex][key]}</li>
                    ))}; */}
                    {answers[questionIndex].map((option) => (
                        <li 
                            key={option.id} 
                            onClick={() => handleCorrectAnswer(option.id)} 
                            className={`${selectedAnswer === option.id ? (option.id === correctAnswers[questionIndex] ? "correct" : "incorrect") : ""}`}
                        >
                            {option.text}
                        </li>
                    ))}
                </div>
            </div>
            <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handleNextQuestion}>Next</div>
            {/* <div className={`score ${quizstate === "start" ? "start": ""}`}>Score: {score}</div> */}

            
        
        </div>
    );

}

export default Quiz;