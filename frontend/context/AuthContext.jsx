import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, role: null });

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ user: decoded.id, role: decoded.role });
      } catch (err) {
        console.log("Invalid token", err);
      }
    }
  }, []); // Run only once on mount

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
