import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthorizationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sign in function
  const signIn = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Store authentication state in localStorage
  };

  // Sign out function
  const signOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear authentication state from localStorage
  };

  // Check if the user is authenticated when the app loads
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
