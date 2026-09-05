import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

// 'pink' is the :root default and carries no class. Everything else is a class
// on <html>. Note v1 of this file called the pink default 'light'; the new
// 'light' is the white/black theme, so stored values are migrated below.
const THEMES = ['pink', 'light', 'dark', 'intense'];
const THEME_CLASSES = ['light', 'dark', 'intense'];
const THEME_META = {
  pink: { color: '#ffb2c8' },
  light: { color: '#ffffff' },
  dark: { color: '#121212' },
  intense: { color: '#d6116a' },
};
const STORAGE_KEY = 'theme.v2';

// Gradient palettes, cycled by the star button. 'theme' means "use whatever blob
// colours the active theme already defines"; the others override them.
const GRADIENTS = ['off', 'vivid', 'neutral', 'green', 'fall'];
const GRADIENT_CLASSES = ['grad-vivid', 'grad-neutral', 'grad-green', 'grad-fall'];
const GRADIENT_KEY = 'gradient.v2';

export function DarkModeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (THEMES.includes(stored)) return stored;
    // Migrate v1: its 'light' meant the pink default.
    const legacy = localStorage.getItem('theme');
    if (legacy === 'light') return 'pink';
    if (THEMES.includes(legacy)) return legacy;
    return 'pink';
  });

  const [gradient, setGradient] = useState(() => {
    const stored = localStorage.getItem(GRADIENT_KEY);
    if (stored === 'theme') return 'vivid';   // palette was renamed
    if (GRADIENTS.includes(stored)) return stored;
    // Migrate the old on/off boolean.
    return localStorage.getItem('gradientOn') === 'true' ? 'vivid' : 'off';
  });

  useEffect(() => {
    document.documentElement.classList.remove(...THEME_CLASSES);
    if (theme !== 'pink') {
      document.documentElement.classList.add(theme);
    }
    localStorage.setItem(STORAGE_KEY, theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', THEME_META[theme].color);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('no-gradient', ...GRADIENT_CLASSES);
    if (gradient === 'off') {
      root.classList.add('no-gradient');
    } else {
      root.classList.add(`grad-${gradient}`);
    }
    localStorage.setItem(GRADIENT_KEY, gradient);
  }, [gradient]);

  const cycleTheme = () => {
    setTheme(prev => THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length]);
  };
  const cycleGradient = () =>
    setGradient(prev => GRADIENTS[(GRADIENTS.indexOf(prev) + 1) % GRADIENTS.length]);

  return (
    <DarkModeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        isIntense: theme === 'intense',
        cycleTheme,
        gradient,
        cycleGradient,
        isGradientOn: gradient !== 'off',
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
