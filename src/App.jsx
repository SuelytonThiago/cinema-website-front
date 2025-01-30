
import './app.css'

import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar.jsx'
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/user/actions.js';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

import backend from '../api/index.ts'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme.js';
import { useThemeContext } from './hooks/UseThemeContext.jsx';
import { GlobalStyles } from './GlobalStyles.js';

function App() {
  const dispatch = useDispatch()
  const {theme} = useThemeContext();

  useEffect(() => {
    async function getUserData() {
      try {
        const accessToken = Cookies.get('accessToken')
        const response = await backend.userAPI.findById({
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        dispatch(loginUser(response.data))
      } catch (err) {
        console.log(err)
      }
    }
    getUserData();
  }, [dispatch])

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles/>
        <Navbar/>
        <div className="container">
          <ToastContainer />
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
