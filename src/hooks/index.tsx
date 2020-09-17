import React from 'react';

import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';
import BumbagProvider from './bumbag';

const AppProvider: React.FC = ({ children }) => (
  <BumbagProvider>
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  </BumbagProvider>
);

export default AppProvider;
