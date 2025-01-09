import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Loading from './components/Loading'
// import NewFullBlog from './pages/NewFullBlog'
import NewSingleBlog from './components/NewSingleBlog'
import LatestSignupPage from './pages/LatestSignUpPage'
import LatestSignin from './components/LatestSignin'
import BoltSignin from './components/Bolt-user-profile/BoltSignin'
import AuthorProfile from './components/Bolt-user-profile/AuthorProfile'
import BoltTextEditor from './components/Bolt-user-profile/BoltTextEditor'
import BoltMainPage from './pages/BoltMainPage'
import BoltFullBlog from './components/Bolt-user-profile/BoltFullBlog'
// import { useBlog } from './hooks'
// import GithubCopilot from './components/GithubCopilot'
import EditBlog from './components/EditBlog'
import { SignupFormDemo } from './components/SignupFormDemo'
// import userProfileBolt from './components/Bolt-user-profile/UserProfileBolt';
// Implementing lazy loading
// const Signup = React.lazy(() => import('./pages/Signup'))
const Signin = React.lazy(() => import('./pages/Signin'))
// const Blogs = React.lazy(() => import('./pages/Blogs'))
const Blog = React.lazy(() => import('./pages/Blog'))
const TextEditor = React.lazy(() => import('./pages/WriteBlog'))
const UserProfileBolt = React.lazy(() => import('./components/Bolt-user-profile/UserProfileBolt'))
const BoltLandingPage = React.lazy(() => import('./pages/BoltLandingPage'))


function App () {
  const token = localStorage.getItem('token')
      
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/newsingleblog' element={<NewSingleBlog/>}></Route>
          <Route
            path='/signup'
            element={
              <React.Suspense fallback={<Loading />}>
                <LatestSignupPage />
              </React.Suspense>
            }
          ></Route>
          {/* <Route    //  new beautifull signin component
            path='/boltsignin'
            element={
              <React.Suspense fallback={<Loading />}>
                <BoltSignin />
              </React.Suspense>
            }
          ></Route> */}
           {/* <Route
            path='/github'
            element={
              <React.Suspense fallback={<Loading />}>
                <GithubCopilot />
              </React.Suspense>
            }
          ></Route> */}
          <Route
            path='/boltfullblog'
            element={
              <React.Suspense fallback={<Loading />}>
                <BoltFullBlog  />
              </React.Suspense>
            }
          ></Route>
          {/* <Route
            path='/userprofilebolt'
            element={
              <React.Suspense fallback={<Loading />}>
                <UserProfileBolt />
              </React.Suspense>
            }
          ></Route> */}
          {/* <Route
            path='/signin'
            element={
              <React.Suspense fallback={<Loading />}>
                <Signin />
              </React.Suspense>
            }
          ></Route> */}
          {/* <Route
            path='/blogs'
            element={
              <React.Suspense fallback={<Loading />}>
                <Blogs />
              </React.Suspense>
            }
          ></Route> */}
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
            path='/details'
            element={
              <React.Suspense fallback={<Loading />}>
                <AuthorProfile />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/bolttexteditor'
            element={
              <React.Suspense fallback={<Loading />}>
                <BoltTextEditor />
              </React.Suspense>
            }
          ></Route>
         <Route
            path='/editblog/:id'
            element={
              <React.Suspense fallback={<Loading />}>
                <EditBlog />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/'
            element={
              <React.Suspense fallback={<Loading />}>
                <BoltLandingPage />
              </React.Suspense>
            }
          ></Route>
           <Route
            path='/blogs'
            element={
              <React.Suspense fallback={<Loading />}>
                <BoltMainPage />
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
            path='/form'
            element={
              <React.Suspense fallback={<Loading />}>
                <SignupFormDemo />
              </React.Suspense>
            }
          ></Route>

          <Route
            path='/userprofile'
            element={
              <React.Suspense fallback={<Loading />}>
                {token ?  <UserProfileBolt />: <Signin />}
              </React.Suspense>
            }
          ></Route>
          <Route path='/signin' element={<LatestSignin/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
