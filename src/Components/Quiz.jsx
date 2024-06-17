import './Quiz.css';
import {useState, useRef} from 'react';

// useRef is used to manipulate the dom directly

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
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const listItemRefs = useRef([]);

    
    const handleStart = () => {
        if (quizstate === 'finished') {
            resetQuiz();
        } else {
            setQuizState("start");
        }
    };

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
        setAnswered(true);
        setSelectedAnswer(null);
        resetListItemStyles();
    }

    const handleCorrectAnswer = (event, selectedAnswer) =>{
        if (answered) return; // ignores other clicks
        const correctAnswer = correctAnswers[questionIndex];
        if(selectedAnswer != null){
            if (selectedAnswer === correctAnswer) {
                setScore(prevScore => prevScore + 1);
            } 
        }
        setSelectedAnswer(selectedAnswer)
        setAnswered(true);

        event.target.style.backgroundColor = selectedAnswer === correctAnswer ? "green" : "red";
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
                <button className={`start-btn ${quizstate === "start" || quizstate === "finished" ? "hide" : " "}`} onClick={handleStart}>Start</button>

                {(quizstate === "finished") ?(
                    <>
                    <div className={`question ${quizstate === "finished" ? "start" : " "}`}>
                        <p>Your score is {score} / {questions.length}</p>
                    </div>
                    <button className="restart-btn" onClick={handleStart}>Restart</button>
                    </>
                ) :
                (
                    <>
                        <div className={`question ${quizstate === "start" ? "start" : " "}`}>
                            <p>{questions[questionIndex]}</p>
                        </div>

                        <div className={`answers ${quizstate === "start" ? "start" : " "}`}>
                        {Object.keys(answers[questionIndex]).map((key, index) => (
                            <li key={key} ref={el => listItemRefs.current[index] = el} onClick={(event) => handleCorrectAnswer(event, answers[questionIndex][key])} >{answers[questionIndex][key]}</li>
                        ))};
                        </div>
                    </>
                )
                }
               

                
            </div>
            <div className={`btn ${quizstate === "start"? "start" : " "}`} onClick={handleNextQuestion}>Next</div>

            
        
        </div>
    );

}

export default Quiz;