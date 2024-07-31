import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email, password, phone }),
      });

      if (!response.ok) {
        alert("User Already Exists");
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Signup response data:', data);

      // Save user details including phone number
      const userDetails = { username: name, email, phone };
      localStorage.setItem('token', data.token);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="sign-Page">
        <h1>Syoft believes in change!</h1>
        <p>A change driven by technology and innovation</p>
        <p>Welcome!</p>
      </div>
      <div className="form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="tel"
            placeholder="Mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className='button-center'>
            <button type="submit">Login</button>

          </div>        </form>
        <div className="link">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
