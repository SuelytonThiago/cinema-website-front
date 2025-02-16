
import './app.css'

import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar.jsx'
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/user/actions.js';
import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme.js';
import { useThemeContext } from './hooks/UseThemeContext.jsx';
import { GlobalStyles } from './GlobalStyles.js';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';

import 'react-loading-skeleton/dist/skeleton.css'

function App() {

  const { i18n } = useTranslation();

  const dispatch = useDispatch()
  const { theme, setTheme } = useThemeContext();

  const currentUser = localStorage.getItem("user");
  const userObject = currentUser ? JSON.parse(currentUser) : null;

  useEffect(() => {
    dispatch(loginUser(userObject));
    i18n.changeLanguage(localStorage.getItem('lang'));
    setTheme(localStorage.getItem('theme'));
  }, [])


  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <SkeletonTheme
          baseColor={theme === 'light' ? lightTheme.loadingBase : darkTheme.loadingBase}
          highlightColor={theme === 'light' ? lightTheme.loadingEfect : darkTheme.loadingEfect}>
          <GlobalStyles />
          <Navbar />
          <div className="container">
            <ToastContainer />
            <Outlet />
          </div>
        </SkeletonTheme>
      </ThemeProvider>
    </>
  )
}

export default App
