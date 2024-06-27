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
    <div>
      <h1>{message}</h1>
      <p>Hello World!</p>
    </div>
    </div>
  );
}

export default Test;