// providers/ThemeProvider.tsx
import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '../stores/useThemeStore';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, getSystemTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'theme-blue');
    
    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (theme === 'system') {
          root.classList.remove('light', 'dark');
          root.classList.add(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    } else if (theme === 'blue') {
      root.classList.add('theme-blue');
    } else {
      root.classList.add(theme);
    }
  }, [theme, getSystemTheme]);

  return <>{children}</>;
};