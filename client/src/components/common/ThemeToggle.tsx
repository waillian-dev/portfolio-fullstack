import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center p-1 bg-muted rounded-full border border-border/50">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'light' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'dark' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'system' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
        }`}
        title="System Preference"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
};
