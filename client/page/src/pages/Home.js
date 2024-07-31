import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDetails = localStorage.getItem('userDetails');

    if (token && userDetails) {
      try {
        const parsedUserDetails = JSON.parse(userDetails);
        setUser(parsedUserDetails);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user details:', error);
        setIsLoggedIn(false);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (!isLoggedIn) {
    return <p>Loading user data...</p>;
  }

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="user-profile">
          <img
            src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
            alt="User Avatar"
            className="user-avatar"
          />
          <h1>{`${getGreeting()}, ${user.username}!`}</h1>
        </div>
        <div className="user-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p>welcomes to this community !</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
