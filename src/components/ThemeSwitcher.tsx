
import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'pink' | 'lavender' | 'gold' | 'default';

interface ThemeOption {
  name: Theme;
  label: string;
  icon: string;
  primaryColor: string;
}

const themes: ThemeOption[] = [
  { name: 'default', label: 'Default', icon: '💖', primaryColor: '#FFDEE2' },
  { name: 'lavender', label: 'Lavender', icon: '💜', primaryColor: '#C9ADFF' },
  { name: 'gold', label: 'Gold', icon: '✨', primaryColor: '#FFD700' },
  { name: 'pink', label: 'Pink', icon: '🌸', primaryColor: '#FF9BBA' },
];

const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('my-quantum-theme');
    if (savedTheme && (savedTheme === 'default' || savedTheme === 'lavender' || savedTheme === 'gold' || savedTheme === 'pink')) {
      setCurrentTheme(savedTheme as Theme);
      applyTheme(savedTheme as Theme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    // Remove previous theme classes
    document.documentElement.classList.remove(
      'theme-default',
      'theme-lavender',
      'theme-gold',
      'theme-pink'
    );

    // Add new theme class
    document.documentElement.classList.add(`theme-${theme}`);

    // Apply any specific theme CSS variables
    const themeOption = themes.find(t => t.name === theme);
    if (themeOption) {
      document.documentElement.style.setProperty('--theme-primary', themeOption.primaryColor);
      
      if (theme === 'lavender') {
        document.documentElement.style.setProperty('--primary', '255 100% 77%');
        document.documentElement.style.setProperty('--accent', '267 80% 89%');
      } else if (theme === 'gold') {
        document.documentElement.style.setProperty('--primary', '45 100% 50%');
        document.documentElement.style.setProperty('--accent', '45 80% 85%');
      } else if (theme === 'pink') {
        document.documentElement.style.setProperty('--primary', '336 100% 80%');
        document.documentElement.style.setProperty('--accent', '336 80% 90%');
      } else {
        // Reset to default theme
        document.documentElement.style.setProperty('--primary', '349 90% 80%');
        document.documentElement.style.setProperty('--accent', '10 80% 89%');
      }
    }

    // Save preference to localStorage
    localStorage.setItem('my-quantum-theme', theme);
  };

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="text-quantum-deeprose h-5 w-5" />
        <h3 className="text-lg font-pacifico text-quantum-deeprose">Theme Colors</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {themes.map((theme) => (
          <Button
            key={theme.name}
            variant={currentTheme === theme.name ? "secondary" : "outline"}
            className={`flex flex-col items-center justify-center p-3 h-auto ${
              currentTheme === theme.name ? 'border-2 border-quantum-deeprose' : ''
            }`}
            onClick={() => changeTheme(theme.name)}
            aria-label={`Switch to ${theme.label} theme`}
          >
            <span className="text-xl mb-1">{theme.icon}</span>
            <span className="text-xs">{theme.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
