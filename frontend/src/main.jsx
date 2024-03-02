import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { About, Dashborad, Projects, Home, Signin, Signup, Error, PostPage } from './pages';
import { PrivateRoute, ThemeProvider, OnlyAdminPrivateRoute, CreatePost, UpdatePost, ScrollToTop } from "./Components"
import { Provider } from 'react-redux';
import store from './sotre.js';
import './index.css'

// const Applayout = (second) => { third }
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} onUpdate={() => window.scrollTo(0, 0)}>
      <Route index={true} path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashborad />} />
      </Route>
      <Route path='' element={<OnlyAdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} />
      </Route>

      <Route path='/projects' element={<Projects />} />
      <Route path='/post/:postSlug' element={<PostPage />} />
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
