import './Quiz.css';
import {useState} from 'react';
function Flashcard(){

    const [state, setState] = useState('Not start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState('false');

    const questions = [
        "What is the capital of France?",
        "What is 2 + 2?",
        "What is the largest ocean on Earth?"
    ];

    const answers = [
        "Paris",
        "4",
        "Pacific Ocean"
    ];

    const handleShowAnswer= () =>{
        setShowAnswer(true);
    }

    return(
        <>
           <div className="box">
                
           {backcolor === "off" ?(
               <div className="card off">
               <p>fsd</p>
           </div>
           ) :
            (
                <div className="card on">
                    <p>fsd</p>
                </div>
            )}
                

                <div className="buttons">
                    <button onClick={() => setState("start")} className={`start ${state === "start" ? "hide" : " "}`}>Start</button>
                    <div className={`navs ${state === "Not start" ? "hide" : " "}`}>

                        
                        <button  onClick={() => setBackcolor("on")}>Show answer</button>
                        <button  onClick={() => setBackcolor("off")}>Next card</button>
                    </div>
                </div>

           
           </div> 

        </>
    );

}

export default Flashcard;