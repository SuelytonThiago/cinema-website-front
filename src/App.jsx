
import './app.css'

import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar.jsx'
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/user/actions.js';
import Cookies from 'js-cookie'
import { useUserData } from './hooks/UseUserData.jsx';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()
  const accessToken = Cookies.get('accessToken')
  const { data: user } = useUserData(accessToken);
  
  useEffect(() => {
    if (user) {
      dispatch(loginUser(user));
    }
  }, [user, dispatch])

  return (
    <>
      <Navbar/>
      <div className="container">
        <ToastContainer />
        <Outlet />
      </div>
    </>
  )
}

export default App
