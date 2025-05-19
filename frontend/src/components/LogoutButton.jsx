import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token or any user data from localStorage
    localStorage.removeItem('token'); // make sure your token key matches
    alert("Logged out successfully!");

    // Navigate to login page
    navigate('/login');
  };

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
