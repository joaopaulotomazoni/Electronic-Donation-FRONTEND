import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.jsx';
import theme from './styles/theme.js';
import { AuthProvider } from './context/AuthContext.jsx';
import { GlobalStyles } from './styles/GlobalStyles.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
