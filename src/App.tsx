import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Loading from './components/Loading'
import NewFullBlog from './pages/NewFullBlog'
// Implementing lazy loading
const Signup = React.lazy(() => import('./pages/Signup'))
const Signin = React.lazy(() => import('./pages/Signin'))
const Blogs = React.lazy(() => import('./pages/Blogs'))
const Blog = React.lazy(() => import('./pages/Blog'))
const TextEditor = React.lazy(() => import('./pages/WriteBlog'))
const UserProfile = React.lazy(() => import('./pages/UserProfile'))

function App () {
  const token = localStorage.getItem('token')

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path='/signup'
            element={
              <React.Suspense fallback={<Loading />}>
                <Signup />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/signin'
            element={
              <React.Suspense fallback={<Loading />}>
                <Signin />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/blogs'
            element={
              <React.Suspense fallback={<Loading />}>
                <Blogs />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/blog/:id'
            element={
              <React.Suspense fallback={<Loading />}>
                <Blog />
              </React.Suspense>
            }
          ></Route>
          {/* <Route path='/publish' element={<Publish/>}></Route> */}
          {/* <Route path='/' element={token? <Blogs/> : <Signin/>}></Route> */}
          {/* everyone can see this main page, but cannot interact with that untill they login and sign up */}
          <Route
            path='/blog'
            element={
              <React.Suspense fallback={<Loading />}>
                <Blog />
              </React.Suspense>
            }
          ></Route>

          <Route
            path='/publish'
            element={
              <React.Suspense fallback={<Loading />}>
                <TextEditor />
              </React.Suspense>
            }
          ></Route>

          <Route
            path='userprofile'
            element={
              <React.Suspense fallback={<Loading />}>
                {token ? <UserProfile /> : <Signin />}
              </React.Suspense>
            }
          ></Route>
          <Route path='/newfullblog' element={<NewFullBlog/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
