import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login response data:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userDetails', JSON.stringify({ email, username: data.username })); // Assuming username is returned
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        {/* Additional login page content */}
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className='button-center'>
          <button type="submit">Login</button>
  
          </div>
        </form>
        <div className="link">
          <a href="/signup">Don't have an account? Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
