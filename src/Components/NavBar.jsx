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
    return location.pathname === path ? 'text-accent' : 'text-white hover:text-accent';
  };
 
  return (
    <nav className="flex px-12 py-5">
      <div className="text-4xl font-black w-1/4 text-white">
        StudyHack<span className="text-accent text-5xl">.</span>
      </div>
      <div className="flex items-center gap-16 ml-auto">
        <div className={`text-xl font-medium cursor-pointer ${isActive('/')}`} onClick={() => handleNavigation('/')}>Home</div>
        <div className={`text-xl font-medium cursor-pointer ${isActive('/about')}`} onClick={() => handleNavigation('/about')}>About us</div>
        <div className={`text-xl font-medium cursor-pointer ${isActive('/contact')}`} onClick={() => handleNavigation('/contact')}>Contact Us</div>
      </div>
    </nav>
  )
}
