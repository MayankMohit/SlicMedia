import { useState, useEffect } from 'react';

const THEME_UPDATE_EVENT = 'theme-update';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (!('darkMode' in localStorage) && 
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    updateDocumentTheme(isDark);
    
    const handleThemeUpdate = (e) => {
      setDarkMode(e.detail.darkMode);
    };
    
    window.addEventListener(THEME_UPDATE_EVENT, handleThemeUpdate);
    return () => window.removeEventListener(THEME_UPDATE_EVENT, handleThemeUpdate);
  }, []);

  const updateTheme = (isDark) => {
    setDarkMode(isDark);
    localStorage.setItem('darkMode', isDark);
    updateDocumentTheme(isDark);
    window.dispatchEvent(new CustomEvent(THEME_UPDATE_EVENT, { 
      detail: { darkMode: isDark } 
    }));
  };

  const toggleTheme = () => {
    updateTheme(!darkMode);
  };

  const updateDocumentTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
  };

  return { darkMode, toggleTheme };
};

