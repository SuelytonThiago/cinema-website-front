import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './GlobalStyles';
import { lightTheme, darkTheme } from './theme.js';
import { useThemeContext } from './hooks/UseThemeContext.jsx';

const AuthLayout = () => {

  const { theme, setTheme} = useThemeContext();

  useEffect(() => {
    setTheme(localStorage.getItem('theme'));
  }, [])

  return (
    <div className="auth-container">
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Outlet />
      </ThemeProvider>
    </div>

  );
};

export default AuthLayout;