import './Quiz.css';
import {useState} from 'react';

function Quiz(){

    const questions = [
        "What is the capital of France?",
        "What is 2 + 2?",
        "What is the largest ocean on Earth?"
    ];

    const answers = [   {A:"Paris", B:"Belgium", C:"South Africa"}, 
                        {A: "4", B:"2", C: "9"}, 
                        {A:"Odo-ogun", B:"Swimming pool", C:"Pacific ocean"}
                    ];
    const correctAnswers = [ "Paris", "4", "Pacific ocean"];

    const [quizstate, setQuizState] = useState('not start');
    const [questionIndex, setQuestionIndex] = useState(0);
   



    const handleStart = () =>{
        setQuizState("start");
    }

    const handleNextQuestion = () =>{
        setQuestionIndex((prev) => (prev + 1) % questions.length);
    }
    const handlePrevQuestion = () =>{
        setQuestionIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
    }

    const handleCorrectAnswer = (selectedAnswer) =>{
        const correctAnswer = correctAnswers[questionIndex];
        {(selectedAnswer === correctAnswer ? console.log("correct") : console.log("not correct"))};
    }
    


    return(
        <div className="container">
            <div className={`btn ${quizstate === "start" ? "start" : " "}`} onClick={handlePrevQuestion}>Prev</div>
            <div className={`btn counter ${quizstate === "start" ? "start" : " "}`}>{questionIndex + 1}</div> 
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