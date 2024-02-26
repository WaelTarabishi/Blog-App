import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { About, Dashborad, Projects, Home, Signin, Signup, Error } from './pages';
import { PrivateRoute, ThemeProvider, OnlyAdminPrivateRoute, CreatePost } from "./Components"
import { Provider } from 'react-redux';
import store from './sotre.js';
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashborad />} />
      </Route>
      <Route path='' element={<OnlyAdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />} />
      </Route>

      <Route path='/projects' element={<Projects />} />
      <Route path='*' element={<Error />} />
    </Route >
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
)
