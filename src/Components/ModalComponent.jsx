import { useState } from "react";
import Modal from "react-modal";
import Dropown from "./Dropown";

Modal.setAppElement('#root'); //set app for accessibility

const ModalComponent = ({ isOpen, onRequestClose, onContinue }) => {
    const [selectedFormat, setSelectedFormat] = useState("");
    const [selectedQuestionType, setSelectedQuestionType] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedQuestionCount, setSelectedQuestionCount] = useState("");

    const formatOptions = ["Quiz", "FlashCard"];
    const questionTypeOptions = selectedFormat === "FlashCard" ? ["T/F", "Cloze", "Open", "Scenario"] : ["MCQ", "T/F", "Cloze"];
    const difficultyOptions = ["Easy", "Medium", "Hard"];
    const questionCountOptions = Array.from({length: 10}, (_, i) => (i + 1) * 5); // [5, 10, 15...]

    const handleContinue = () => {
        const options = {
            selectedFormat,
            selectedQuestionType,
            selectedDifficulty,
            selectedQuestionCount
        }
        onContinue(options);
        onRequestClose();
    };

    if (!isOpen) return null
    
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Select Options"
        className="modal"
        overlayClassName="overlay"
    >
        <div className="head">
            <h2>Select Options</h2>
            <p className="closebtn" onClick={onRequestClose}>X</p>
        </div>
        <div className="settings">
            <div className="first-select">
            <Dropown 
                label="Format"
                options={formatOptions}
                selectedOption={selectedFormat}
                onSelect={setSelectedFormat}
            />

            <Dropown 
                label="Question Type"
                options={questionTypeOptions}
                selectedOption={selectedQuestionType}
                onSelect={setSelectedQuestionType}
            />

           
            </div>

            <div className="second-select">

                <Dropown 
                    label="Question Count"
                    options={questionCountOptions}
                    selectedOption={selectedQuestionCount}
                    onSelect={setSelectedQuestionCount}
                />
                     
                <Dropown
                    label="Difficulty" 
                    options={difficultyOptions}
                    selectedOption={selectedDifficulty}
                    onSelect={setSelectedDifficulty}
            />
                
               
            </div>
        </div>
   
        {/* <div className="settings">
            <div className="first-select">
                <label htmlFor="format">
                    <select
                        value={selectedFormat}
                        onChange={(e) => {
                            setSelectedFormat(e.target.value);
                            setSelectedQuestionType("");//Reset question type when format changes
                        }}
                        className="format"
                    >
                        <option value="" disabled>Select Format</option>
                        <option value="Quiz">Quiz</option>
                        <option value="FlashCard">FlashCard</option>
                    </select>
                </label>

                <label htmlFor="format">
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => {
                            setSelectedDifficulty(e.target.value);
                        }}
                        className="format"
                    >
                        <option value="" disabled>Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>

            
            </div>

            <div className="second-select">
            <label htmlFor="questionType">
                    <select
                        value={selectedQuestionType}
                        onChange={(e) => setSelectedQuestionType(e.target.value)}
                        className="format"
                    >
                        <option value="" disabled>Question Type</option>
                        {selectedFormat === "FlashCard" ? (
                            <>
                                <option value="T/F">T/F</option>
                                <option value="Cloze">Cloze Test</option>
                                <option value="Open">Open</option>
                                <option value="Scenario">Scenario</option>
                            </>
                        ) : (
                            <>
                                <option value="MCQ">MCQ</option>
                                <option value="T/F">T/F</option>
                                <option value="Cloze">Cloze Test</option>
                            </>
                        )}
                    </select>
                </label>

                <label htmlFor="format">
                    <select
                        value={selectedQuestionCount}
                        onChange={(e) => {
                            setSelectedQuestionCount(e.target.value);
                        }}
                        className="format"
                    >
                        <option value="" disabled>Question Count</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>
            
        </div> */}
        <div className="continue-btn-cont"><button type="button" onClick={handleContinue} className="continue-btn">Continue</button></div>
        
    </Modal>
    
  )
}

export default ModalComponent