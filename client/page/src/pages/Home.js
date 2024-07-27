import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome to the Home Page</h2>
        <p>You are logged in!</p>
        <div>
          <a href="/login">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
