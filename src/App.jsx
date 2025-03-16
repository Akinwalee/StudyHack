import Dashboard from './Components/Dashboard';
import Quiz from './Components/Quiz';
import Flashcard from './Components/Flashcard';
import SigninPage from './Components/SigninPage';
import SignupPage from './Components/SignupPage';
import About_us from './Components/About-us';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/flashcard' element={<Flashcard />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/about' element={<About_us />} />
      </Routes>
    </BrowserRouter>
    // <div className='body'>
    //   <div>
    //     <Dashboard />
    //   </div>
    // </div>
  )
}

export default App
