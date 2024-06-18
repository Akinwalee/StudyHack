import { useState, useEffect } from 'react';
import './NavBar.css'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">StudyHack</div>
        <div className='middle'></div>
        <div className="nav-button">
            <button className="entry">Join</button>
            <button className="entry">Login</button>
        </div>
    </div>
  )
}
