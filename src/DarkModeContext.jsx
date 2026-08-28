import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

const THEMES = ['light', 'dark', 'intense'];
const THEME_META = {
  light: { color: '#ffb2c8' },
  dark: { color: '#121212' },
  intense: { color: '#d6116a' },
};

export function DarkModeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    return THEMES.includes(stored) ? stored : 'light';
  });

  const [isGradientOn, setIsGradientOn] = useState(() => {
    const stored = localStorage.getItem('gradientOn');
    return stored === null ? false : stored === 'true';
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'intense');
    if (theme !== 'light') {
      document.documentElement.classList.add(theme);
    }
    localStorage.setItem('theme', theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', THEME_META[theme].color);
    }
  }, [theme]);

  useEffect(() => {
    if (isGradientOn) {
      document.documentElement.classList.remove('no-gradient');
    } else {
      document.documentElement.classList.add('no-gradient');
    }
    localStorage.setItem('gradientOn', isGradientOn);
  }, [isGradientOn]);

  const cycleTheme = () => {
    setTheme(prev => THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length]);
  };
  const toggleGradient = () => setIsGradientOn(prev => !prev);

  return (
    <DarkModeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        isIntense: theme === 'intense',
        cycleTheme,
        isGradientOn,
        toggleGradient,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
