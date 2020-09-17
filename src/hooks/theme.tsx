import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from 'styled-components';

import { themes, GlobalStyles } from '../styles';

// import api from '../services/api';

interface ThemeOptions {
  [key: string]: 'light' | 'dark';
  // [key: string]: ThemeOptions[keyof ThemeOptions];
}

interface ThemeContextData {
  theme: DefaultTheme;
  themeTitle?: string;
  toggleTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | string>(() => {
    const appTheme = localStorage.getItem('@HarpaCrista:appTheme');

    if (!appTheme) return 'light';

    return appTheme;
  });

  useEffect(() => {
    localStorage.setItem('@HarpaCrista:appTheme', themeMode);
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode(oldTheme => (oldTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => {
    return themes.light.title !== themeMode ? themes.dark : themes.light;
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        themeTitle: themeMode,
        theme,
        toggleTheme,
      }}
    >
      <StyledThemeProvider theme={theme}>
        {children}
        <GlobalStyles />
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export { useTheme, ThemeProvider };
