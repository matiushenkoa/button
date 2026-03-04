import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || defaultTheme;
  });

  useEffect(() => {
    // Update document root element with theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
