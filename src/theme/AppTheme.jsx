import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './';
import { useSelector } from 'react-redux';

export const AppTheme = ({ children }) => {
  const { isDarkMode } = useSelector((state) => state.ui);
  const selectedTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};