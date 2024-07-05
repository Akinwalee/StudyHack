import './NavBar.css'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();


  const handleSigninClick = () => {
    setTimeout(() => {
      navigate('/signin');
    }, 1000)
    
  }

  const handleSignupClick = () => {
    setTimeout(() => {
      navigate('/signup');
    }, 1000)
  }
 
  return (
    <div className='nav'>
        <div className="logo">StudyHack<span className='ellipse'>.</span></div>
        <div className='middle'>
          <div className="home">Home</div>
          <div className="about">About us</div>
          <div className="contact">Contact Us</div>
        </div>
        <div className="nav-button">
            <button className="entry signin" onClick={handleSigninClick}>Sign In</button>
            <button className="entry signup" onClick={handleSignupClick}>Sign Up</button>
        </div>
    </div>
  )
}
