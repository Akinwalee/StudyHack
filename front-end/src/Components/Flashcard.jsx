import './Quiz.css';
import {useState} from 'react';
function Flashcard(){

    const [state, setState] = useState('Not start');
    const [backcolor, setBackcolor] = useState('off');

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
               

        </>
    );

}

export default Flashcard;