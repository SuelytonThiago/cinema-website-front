import { useState } from 'react'
import './App.css'

import { Outlet } from 'react-router-dom'

import Navbar from './components/navbar/Navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default App
