import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ModalComponent from "./ModalComponent";
import ExplainModalComponent from "./ExplainModalComponent";


export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState({
        selectedFormat: "",
        selectedQuestionType: "",
        selectedDifficulty: "",
        selectedQuestionCount: ""
    })

    const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
    const [explained, setExplained] = useState("");
    const [isExplainedLoading, setIsExplainedLoading] = useState(false);

    const fileInputRef = useRef();
    const navigate = useNavigate();

    const handleFile = (selectedFile) => {
        setText("");
        setFile(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFile(droppedFile);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const handleButtonClick = () => {
        setTimeout(() => {
            fileInputRef.current.click();
        }, 1000)
        
    };

    const uploadFile = async (file, options) => {
        const formData = new FormData();
        formData.append('file', file);
        Object.keys(options).forEach(key => formData.append(key, options[key]));

        try {
            const response = await fetch('https://needless-coast-nappy-house-production.pipeops.app/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed!');
            }

            const result = await response.json();
            console.log(result)
            setUploadStatus(result.mesaage);
            navigate(`/${options.assessment_type}`, { state: { quizData: result.data } });
        } catch (error) {
            setUploadStatus(error.mesaage);
            console.error('Error uploading file:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const uploadText = async (text, options) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            text: text,
            assessment_type: options.assessment_type.toLowerCase(),
            question_type: options.question_type.toLowerCase(),
            difficulty: options.difficulty.toLowerCase(),
            num_of_questions: options.num_of_questions
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch('https://needless-coast-nappy-house-production.pipeops.app/api/upload', requestOptions);

            if (!response.ok) {
                throw new Error('Text upload failed!');
            }

            const result = await response.json();
            setUploadStatus(result["mesaage"]);
            if (modalOptions.selectedFormat === 'Quiz'){
                navigate(`/${options.assessment_type}`, { state : {quizData: result.data } })
            } else {
                navigate(`/${options.assessment_type}`, { state : {quizData: result.data } })
            }
        } catch (error) {
            setUploadStatus(error.mesaage);
            console.error('Error uploading text:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const contentExplanation = async (content, type) => {
        let requestOptions;

        if (type === 'text'){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            const raw = JSON.stringify({ text: content });
    
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
        } else if (type === 'file'){
            const formData = new FormData();
            formData.append('file', content);

            requestOptions = {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            };
        }
       

        try {
            const response = await fetch('http://127.0.0.1:5000/api/explain', requestOptions);

            if (!response.ok) {
                throw new Error('upload failed!');
            }

            const result = await response.json();
            setUploadStatus(result["mesaage"]);
            setTimeout(() => {
                setUploadStatus("")
            }, 3000)
            setExplained(result["data"]["explanation"]);
            setIsExplainModalOpen(true);
        } catch (error) {
            setUploadStatus(error.mesaage);
            console.error('Error uploading text:', error);
        } finally {
            setIsExplainedLoading(false);
        }
    };

    const handleGenerateClick = () => {
        if ((text.length> 0) && (text.length < 500)){
            setUploadStatus('Text must not be less than 500 characters')
            setTimeout(() => {
                setUploadStatus('');
            }, 3000); 
        }
        
        else if (file || text) {
            setTimeout(() => {
                setIsModalOpen(true);
            }, 500)
            
        } else {
            setUploadStatus('Please upload either a file or text, not both.');
            setTimeout(() => {
                setUploadStatus('');
            }, 3000); 
        }
    };

    const handleModalContinue = (selectedOptions) => {
        setModalOptions(selectedOptions);
    
        if ((file || text) && selectedOptions.selectedFormat && selectedOptions.selectedQuestionType && selectedOptions.selectedDifficulty && selectedOptions.selectedQuestionCount) {
            setIsLoading(true);
    
            const options = {
                assessment_type: selectedOptions.selectedFormat.toLowerCase(),
                question_type: selectedOptions.selectedQuestionType.toLowerCase(),
                difficulty: selectedOptions.selectedDifficulty.toLowerCase(),
                num_of_questions: selectedOptions.selectedQuestionCount
            };
    
            // console.log(options);
    
            if (file) {
                uploadFile(file, options);
            } else {
                uploadText(text, options);
            }
        } else {
            setUploadStatus('Please fill all fields and provide either a file or text, not both.');
            setTimeout(() => {
                setUploadStatus('');
            }, 3000); 
        }
    };

    const handleContentExplained = () => {
        if (text) {
            setIsExplainedLoading(true);
            setTimeout(() => {
                contentExplanation(text,'text');
                
            }, 500);
        }else  if (file) {
            setIsExplainedLoading(true);
            setTimeout(() => {
                contentExplanation(file,'file');
                
            }, 500);
        } else {
            setUploadStatus("Please Enter text for explanation");     
            setTimeout(() => {
                setUploadStatus("");
            }, 3000);
            
        }
       
    }

    const handleCancel = () => {
        if (file){
            setFile(null);
        } else if (text) {
            setText("");
        }
    }
    

    return (
        <>
            <NavBar />
            <div className="p-8 flex justify-center items-center">
                <div className="w-[70%] rounded-[20px] bg-black/[0.02] shadow-md hover:shadow-lg transition-shadow duration-300 border border-accent">
                    <div className="text-center p-10 mt-10">
                        <p className="text-3xl font-medium tracking-widest text-accent mb-5">LEARN WITH EASE.</p>
                        <p className="text-xl font-medium text-white">Transform your documents and texts into personalized assessments</p>
                    </div>

                    <div className="mx-auto w-[70%] rounded-lg">
                        {!text && (
                            <div className="text-center">
                                <div
                                    className="mx-auto w-1/2 my-8 p-5 border-2 border-dashed border-accent rounded-lg cursor-pointer"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <i className="fas fa-file-upload fa-4x text-white"></i>
                                    <p className="text-white my-2">Drag & Drop file here</p>
                                    <button 
                                        className="mt-5 px-5 py-2.5 rounded-full bg-accent text-white text-sm hover:opacity-70 transition-opacity"
                                        onClick={handleButtonClick}
                                    >
                                        Browse File
                                    </button>
                                    <input
                                        className="hidden"
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="text-white flex items-center gap-2.5">
                                    {file && (
                                        <>
                                            <p>File Uploaded:</p>
                                            <p>{file.name}</p>
                                            <button 
                                                className="flex items-center text-white hover:text-red-500"
                                                onClick={handleCancel}
                                            >
                                                <span className="text-red-500 mr-1">X</span> Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {uploadStatus && <p className="text-red-500 italic text-center">{uploadStatus}</p>}
                        
                        {!file && !text && (
                            <div className="text-accent text-base font-black tracking-widest text-center">OR</div>
                        )}
                        
                        {!file && (
                            <div className="w-4/5 mx-auto flex flex-col h-[450px]">
                                <textarea
                                    className="my-8 p-5 w-full h-full rounded-lg text-white text-sm border-2 border-dashed border-accent bg-transparent resize-none"
                                    value={text}
                                    placeholder="Paste Text you want to convert"
                                    onChange={(e) => setText(e.target.value)}
                                ></textarea>
                                {text && (
                                    <button 
                                        className="ml-auto text-white hover:text-red-500"
                                        onClick={handleCancel}
                                    >
                                        <span className="text-red-500 mr-1">X</span> Clear
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="pt-8 flex justify-center items-center gap-2.5 pb-8">
                            <button 
                                className="rounded-lg px-4 py-2.5 bg-accent text-white text-base hover:border hover:border-white transition-all"
                                onClick={handleGenerateClick} 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Generate Now'}
                            </button>
                            <button 
                                className="rounded-lg px-8 py-2.5 bg-accent text-white text-base hover:border hover:border-white transition-all"
                                onClick={handleContentExplained}
                            >
                                {isExplainedLoading ? 'Loading...' : 'Explain'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent 
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onContinue={handleModalContinue}
            />

            <ExplainModalComponent 
                isOpen={isExplainModalOpen}
                onRequestClose={() => setIsExplainModalOpen(false)}
                showExplanation={explained}
            />
        </>
    );
}
