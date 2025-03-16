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
    const questionCountOptions = Array.from({length: 8}, (_, i) => (i + 1) * 5); // [5, 10, 15...]

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
        className="bg-[#161616] p-5 rounded max-w-2xl w-full shadow-xl"
        overlayClassName="fixed inset-0 bg-black/75 flex items-center justify-center backdrop-blur-sm"
    >
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl">Select Options</h2>
            <button 
                className="text-white hover:text-red-500 text-xl transition-colors"
                onClick={onRequestClose}
            >
                X
            </button>
        </div>
        
        <div className="grid grid-cols-2 gap-8 p-8">
            <div className="flex flex-col gap-12">
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

            <div className="flex flex-col gap-12">
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

        <div className="flex justify-center mt-6">
            <button 
                className="px-6 py-2.5 bg-accent text-white rounded hover:opacity-80 transition-opacity"
                onClick={handleContinue}
            >
                Continue
            </button>
        </div>
    </Modal>
    
  )
}

export default ModalComponent