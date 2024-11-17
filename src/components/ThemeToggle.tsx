import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface Props {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeToggle: React.FC<Props> = ({ theme, setTheme }) => {
  return (
    <button
      onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
      className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
    >
      {theme === 'default' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;