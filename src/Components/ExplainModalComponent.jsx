import { useState } from "react";
import Modal from "react-modal";
import './Explain.css'

Modal.setAppElement('#root');

export default function ExplainModalComponent({ isOpen, onRequestClose, showExplanation }) {
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Select Options"
        className="explain-modal"
        overlayClassName="explain-overlay"
    >
        <div className="explain-cont">
            <p className="closebtn explainbtn" onClick={onRequestClose}>X</p> 
            <div className="explained-text">
                {showExplanation}
            </div>
        </div>
    </Modal>
  )
}
