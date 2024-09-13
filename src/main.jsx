import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Home from './routes/home/Home.jsx'
import Login from './routes/login/Login.jsx'
import Register from './routes/register/Register.jsx'
import SearchPage from './routes/search-page/SearchPage.jsx'
import Movie from './routes/movie/Movie.jsx'
import Session from './routes/session/Session.jsx'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
        path:"/movie/:id",
        element:<Movie/>,
      },
      {
        path:"/movies",
        element:<SearchPage/>
      },
      {
        path:"/session/:id",
        element:<Session/>,
      }
    ]
  }
])

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </QueryClientProvider>

)
