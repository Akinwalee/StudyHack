
function Quiz(){
    return(
        <div className="container">
            <div className="btn">PREV</div>

            <div className="screen">
                <div className="btn counter">1</div> 
                <div className="question"></div>
                    
                <div className="answers">
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                </div>

            </div>

            <div className="btn">NEXT</div>
        
        </div>
    );

}

export default Quiz;