import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === null ? true : stored === 'true';
  });

  const [isGradientOn, setIsGradientOn] = useState(() => {
    const stored = localStorage.getItem('gradientOn');
    return stored === null ? false : stored === 'true';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark);
  }, [isDark]);

  useEffect(() => {
    if (isGradientOn) {
      document.documentElement.classList.remove('no-gradient');
    } else {
      document.documentElement.classList.add('no-gradient');
    }
    localStorage.setItem('gradientOn', isGradientOn);
  }, [isGradientOn]);

  const toggleDark = () => setIsDark(prev => !prev);
  const toggleGradient = () => setIsGradientOn(prev => !prev);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark, isGradientOn, toggleGradient }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
