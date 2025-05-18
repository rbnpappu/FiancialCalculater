import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const ProtectedRoute = ({ allowedRoles }) => {
  // Step 1: Get token and role from localStorage
  const token = localStorage.getItem('token');
 const decoded = jwtDecode(token);
  


  // Step 2: If token doesn't exist, user is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  console.log(decoded.role,"called");

  // Step 3: If user's role is not in allowedRoles, deny access
  if (!allowedRoles.includes(decoded.role)) {
    // Redirect to unauthorized page or somewhere else
    return <Navigate to="/unauthorized" replace />;
  }

  // Step 4: If user is logged in and role is allowed, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
