import Modal from "react-modal";
import ReactMarkdown from 'react-markdown';

Modal.setAppElement('#root');

export default function ExplainModalComponent({ isOpen, onRequestClose, showExplanation }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Select Options"
            className="bg-[#161616] p-8 rounded-lg outline-none overflow-y-scroll max-h-[80vh] max-w-[80vh] scrollbar-hide"
            overlayClassName={`fixed inset-0 flex flex-col justify-center items-center bg-black/75 backdrop-blur-sm ${isOpen ? 'animate-overlayFadeIn' : ''}`}
        >
            <div className="flex flex-col items-center">
                <button 
                    className="self-end text-white hover:text-red-500 cursor-pointer text-xl p-1.5 -mt-2.5 -mr-2.5 mb-2.5"
                    onClick={onRequestClose}
                >
                    X
                </button>
                <div className="text-white prose prose-invert max-w-none">
                    <ReactMarkdown>{showExplanation}</ReactMarkdown>
                </div>
            </div>
        </Modal>
    )
}
