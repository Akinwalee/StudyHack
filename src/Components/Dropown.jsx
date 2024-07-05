import { useState, useRef, useEffect } from 'react'
import './Dropdown.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Dropown({ label, options, selectedOption, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [dropdownRef]);
  return (
    <div className="dropdown" ref={dropdownRef}>
        {/* <div className="dropdown-label">{label}</div> */}
        <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
            {selectedOption || `${label}`}
            {/* <i className="fas fa-chevron-down dropdown-icon" ></i> */}
            <i className={`fas fa-chevron-down dropdown-icon ${isOpen ? 'open' : ''}`}></i>
            {isOpen && (
                <div className="dropdown-options">
                    {options.map((option, index) => (
                        <div 
                            key={index}
                            className="dropdown-option"
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false)
                            }}>
                                {option}
                            </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}
