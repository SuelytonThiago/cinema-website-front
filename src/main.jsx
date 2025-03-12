import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthApp from './AuthApp.jsx'
import './index.css'

import Home from './routes/home/Home.jsx'
import Login from './routes/login/Login.jsx'
import Register from './routes/register/Register.jsx'
import SearchPage from './routes/search-page/SearchPage.jsx'
import Movie from './routes/movie/Movie.jsx'
import Session from './routes/session/Session.jsx'
import CategoryMovies from './routes/category-movies/CategoryMovies.jsx'
import UserData from './routes/user-data/UserData.jsx'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store.js'
import ChangePassword from './routes/change-password/ChangePassword.jsx'

import { ThemeContextProvider } from './context/ThemeContext.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
      {
        path: "/movies",
        element: <SearchPage />
      },
      {
        path: "/session/:id",
        element: <Session />,
      },
      {
        path: "/category-movies",
        element: <CategoryMovies />
      },
      {
        path: "/user/data/:section",
        element: <UserData />,
      },
    ]
  },
  {

    element: <AuthApp />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/recover",
        element: <ChangePassword />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeContextProvider>  
          <RouterProvider router={router} />
      </ThemeContextProvider>
    </React.StrictMode>
  </Provider>

)
