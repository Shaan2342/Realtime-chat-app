
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username); // Call the onLogin function passed as a prop
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Chat App</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;