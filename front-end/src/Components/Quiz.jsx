import './Quiz.css';

function Quiz(){
    return(
        <div className="container">
            <div className="btn">Prev</div>

            <div className="screen">
                <div className="btn counter">1</div> 
                <div className="question"><p></p></div>

                <div className="answers">
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                </div>

            </div>

            <div className="btn">Next</div>
        
        </div>
    );

}

export default Quiz;