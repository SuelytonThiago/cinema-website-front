
import './app.css'

import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar.jsx'
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/user/actions.js';
import Cookies from 'js-cookie'
import { useEffect } from 'react';

import backend from '../api/index.ts'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function getUserData() {
      try {
        const accessToken = Cookies.get('accessToken')
        const response = await backend.userAPI.findById({
          headers: {
            Authorization : `Bearer ${accessToken}`
          }
        })

        dispatch(loginUser(response.data))
      }catch (err) {
        console.log(err)
      }
    } 
    getUserData();
  }, [dispatch])

  return (
    <>
      <Navbar />
      <div className="container">
        <ToastContainer />
        <Outlet />
      </div>
    </>
  )
}

export default App
