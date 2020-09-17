import React from 'react';

import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </AuthProvider>
);

export default AppProvider;
