import { useState, useRef, useEffect } from 'react'
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
        <div className="relative w-[200px]" ref={dropdownRef}>
            <div 
                className="p-2.5 text-white bg-[#202020] rounded cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption || `${label}`}
                <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 bg-[#202020] rounded z-[1000]">
                        {options.map((option, index) => (
                            <div 
                                key={index}
                                className="p-2.5 cursor-pointer hover:bg-black/40 rounded first:border-t border-t-gray-600"
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
