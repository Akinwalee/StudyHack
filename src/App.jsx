import './App.css';
import Dashboard from './Components/Dashboard';
import Quiz from './Components/Quiz';
import Flashcard from './Components/Flashcard'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/flashcard' element={<Flashcard />} />
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
