import './Quiz.css';
import {useState, useEffect} from 'react';

function Quiz(){

    const questions = [
        "What is the capital of France?",
        "What is 2 + 2?",
        "What is the largest ocean on Earth?",
        "What is the largest planet in our solar system?",
        "Who wrote 'To Kill a Mockingbird'?",
        "What is the chemical symbol for water?",
        "What is the longest river in the world?",
        "Who painted the Mona Lisa?",
        "What is the smallest country in the world by area?",
        "What year did the Titanic sink?",
        "Who discovered penicillin?",
        "What is the capital of Japan?",
        "What is the square root of 64?"
    ];

    const answers = [
        { A: "Paris", B: "Belgium", C: "South Africa" },
        { A: "4", B: "2", C: "9" },
        { A: "Odo-ogun", B: "Swimming pool", C: "Pacific ocean" },
        { A: "Jupiter", B: "Mars", C: "Earth" },
        { A: "Harper Lee", B: "J.K. Rowling", C: "Mark Twain" },
        { A: "H2O", B: "O2", C: "CO2" },
        { A: "Nile", B: "Amazon", C: "Yangtze" },
        { A: "Leonardo da Vinci", B: "Vincent van Gogh", C: "Pablo Picasso" },
        { A: "Vatican City", B: "Monaco", C: "San Marino" },
        { A: "1912", B: "1905", C: "1920" },
        { A: "Alexander Fleming", B: "Louis Pasteur", C: "Marie Curie" },
        { A: "Tokyo", B: "Kyoto", C: "Osaka" },
        { A: "8", B: "6", C: "10" }
    ];

    const correctAnswers = [
        "Paris",
        "4",
        "Pacific ocean",
        "Jupiter",
        "Harper Lee",
        "H2O",
        "Nile",
        "Leonardo da Vinci",
        "Vatican City",
        "1912",
        "Alexander Fleming",
        "Tokyo",
        "8"
    ];

    const [quizstate, setQuizState] = useState('not start');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false); // Track if an answer has been selected

    useEffect(() =>{
        console.log(score);
    }, [score]);
   



    const handleStart = () =>{
        setQuizState("start");
    }

    const handleNextQuestion = () =>{
        setQuestionIndex((prev) => (prev + 1) % questions.length);
        setAnswered(false);
    }
    const handlePrevQuestion = () =>{
        setQuestionIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
        setAnswered(true);
    }

    const handleCorrectAnswer = (selectedAnswer) =>{
        if(!answered){
            const correctAnswer = correctAnswers[questionIndex];
            if (selectedAnswer === correctAnswer) {
            setScore(prevScore => prevScore + 1);
            } 
        }
        
        setAnswered(true);
    }
    


    return(
        <div className="container">
            <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handlePrevQuestion}>Prev</div>
            <div className={`btn counter ${quizstate === "start" ? "start" : " "}`}>{questionIndex + 1} / {questions.length}</div> 
            <div className="screen">
                <button className={`start-btn ${quizstate === "start" ? "hide" : " "}`} onClick={handleStart}>Start</button>
                <div className={`question ${quizstate === "start" ? "start" : " "}`}>
                    <p>{questions[questionIndex]}</p>
                </div>

                <div className={`answers ${quizstate === "start" ? "start" : " "}`}>
                    {Object.keys(answers[questionIndex]).map((key) => (
                        <li key={key} onClick={() => handleCorrectAnswer(answers[questionIndex][key])}>{answers[questionIndex][key]}</li>
                    ))};
                </div>
            </div>
            <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handleNextQuestion}>Next</div>

            
        
        </div>
    );

}

export default Quiz;