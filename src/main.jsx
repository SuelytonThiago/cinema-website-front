import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import Session from './routes/Session.jsx'
import SearchPage from './routes/SearchPage.jsx'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path:"/session/:id",
        element:<Session/>,
      },
      {
        path:"/movies",
        element:<SearchPage/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
