// src/layouts/MainLayout.jsx
import React, { useContext } from "react";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import useDarkMode from '../components/useDarkMode';
import { AppContext } from '../context/AppContext';
export default function MainLayout({ children }) {
    const { user,logout } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const { isDarkMode, toggleTheme } = useDarkMode();
  return (
    <div>
      <Header
        toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        user={user}
        logout={logout}
      />
      {isSidebarOpen && <Sidebar isDarkMode={isDarkMode} user={user}/>}
      <main
      className={`mt-16  ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-[calc(100vh-4rem)] transition-all duration-500 ${
        isSidebarOpen ? 'ml-72' : 'ml-0 lg:ml-72'
      }`}
    >
      {children}
    </main>
    </div>
  );
}
