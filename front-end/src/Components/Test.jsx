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
      <h1>{message}</h1>
    </div>
  );
}

export default Test;