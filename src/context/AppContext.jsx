import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
});
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [token, setToken] = useState(() => {
    return localStorage.getItem('authToken') || null;
});

const [user, setUser] = useState(null);

// Function to log in (sets token and authentication)
const loggedIN = (token,userData) => {
    setIsAuthenticated(true);
    setToken(token);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
};

// Function to log out (clears token and authentication)
const logout = () => {
  setToken(null);
  setUser(null);
  setIsAuthenticated(false);
  localStorage.clear();

  




};




  // Function to fetch user profile
  const fetchUserProfile = async (authToken) => {
    try {
        const response = await fetch('https://inventoryapi.rusoft.in/public/api/userLoggedIn', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        setUser(userData.user);
       
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData.user));
    } catch (error) {
        console.error('Error fetching user data:', error);
        logout(); // Logout if fetching user data fails
    }
};

 // Re-fetch user data on refresh if token exists in localStorage
 useEffect(() => {
  const storedToken = localStorage.getItem('authToken');
  const storedUser = localStorage.getItem('user');

  if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      if (storedUser) {
          setUser(JSON.parse(storedUser));
        
      } else {
          fetchUserProfile(storedToken);
      }
  }
}, []);

  return (
    <AppContext.Provider value={{ isAuthenticated, loggedIN, logout, user,token,theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
