import { useState, useEffect } from 'react';

const THEME_UPDATE_EVENT = 'theme-update';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false); // default light mode

  useEffect(() => {
    updateDocumentTheme(false); // always start in light mode

    const handleThemeUpdate = (e) => {
      setDarkMode(e.detail.darkMode);
    };

    window.addEventListener(THEME_UPDATE_EVENT, handleThemeUpdate);
    return () => window.removeEventListener(THEME_UPDATE_EVENT, handleThemeUpdate);
  }, []);

  const updateTheme = (isDark) => {
    setDarkMode(isDark);
    updateDocumentTheme(isDark);

    // let other components know theme changed
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
