// src/App.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css'; // Import the main CSS file
import Login from './Login'; // Import the Login component

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on('chat history', (history) => {
      setMessages(history);
    });

    socket.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat history');
      socket.off('new message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit('send message', `${username}: ${input}`);
      setInput('');
    }
  };

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="chat-container">
      <h1>Chat Application</h1>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message">{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;