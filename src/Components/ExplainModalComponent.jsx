import { useState } from "react";
import Modal from "react-modal";
import './Explain.css'

Modal.setAppElement('#root');

export default function ExplainModalComponent({ isOpen, onRequestClose }) {
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quasi itaque ut dolorem laborum quisquam quidem aut, quae consequuntur repellendus pariatur sed odio doloremque
                dicta sint culpa praesentium rem vel nihil!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quasi itaque ut dolorem laborum quisquam quidem aut, quae consequuntur repellendus pariatur sed odio doloremque
                dicta sint culpa praesentium rem vel nihil!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quasi itaque ut dolorem laborum quisquam quidem aut, quae consequuntur repellendus pariatur sed odio doloremque
                dicta sint culpa praesentium rem vel nihil!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quasi itaque ut dolorem laborum quisquam quidem aut, quae consequuntur repellendus pariatur sed odio doloremque
                dicta sint culpa praesentium rem vel nihil!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quasi itaque ut dolorem laborum quisquam quidem aut, quae consequuntur repellendus pariatur sed odio doloremque
                dicta sint culpa praesentium rem vel nihil!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quasi itaque ut dolorem laborum quisquam quidem aut, quae consequuntur repellendus pariatur sed odio doloremque
                dicta sint culpa praesentium rem vel nihil!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quasi itaque ut dolorem laborum quisquam quidem aut, quae consequuntur repellendus pariatur sed odio doloremque
                dicta sint culpa praesentium rem vel nihil!
            </div>
        </div>
    </Modal>
  )
}
