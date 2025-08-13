// src/components/ThemeToggle.js
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import {useTheme} from '../../hooks/common/useTheme.js';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-20 right-0 z-50 px-1 py-3 rounded-l-md backdrop-blur-lg transition-all duration-300 ${
        darkMode 
          ? 'bg-zinc-800/80 text-yellow-300 hover:bg-zinc-700/90 border-zinc-700' 
          : 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300/90 border-zinc-300'
      } border shadow-lg hover:shadow-xl`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5" strokeWidth={1.5} />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;