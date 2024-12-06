import { useState } from 'react';
import './NavBar.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();


  const handleNavigation = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 500)
    
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

 
  return (
    <div className='nav'>
        <div className="logo">StudyHack<span className='ellipse'>.</span></div>
        <div className='middle'>
          <div className={`home ${isActive('/')}`} onClick={() => handleNavigation('/')}>Home</div>
          <div className={`about ${isActive('/about')}`} onClick={() => handleNavigation('/about')}>About us</div>
          <div className={`contact ${isActive('/contact')}`} onClick={() => handleNavigation('/contact')}>Contact Us</div>
        </div>
        {/* <div className="nav-button">
            <button className="entry signin" onClick={handleSigninClick}>Sign In</button>
            <button className="entry signup" onClick={handleSignupClick}>Sign Up</button>
        </div> */}
    </div>
  )
}
