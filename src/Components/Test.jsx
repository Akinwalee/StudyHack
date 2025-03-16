import { useState, useEffect } from 'react';
import NavBar from "./NavBar";

function Test() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/form')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">{message}</h1>
        <p className="text-white">Hello World!</p>
      </div>
    </div>
  );
}

export default Test;