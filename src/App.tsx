import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Signup from './pages/Signup'
// import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import { Blog } from './pages/Blog'
// import { Publish } from './pages/Publish'
// import Signin from './pages/Signin'
// import Home from './pages/Home'
import TextEditor from './pages/TextEditor'
import { ToastContainer } from 'react-toastify'
import UserProfile from './pages/UserProfile'
import ImageUpload from './components/ImageUpload'

// Implementing lazy loading
const Signup = React.lazy(()=> import ('./pages/Signup'))
const Signin = React.lazy(()=> import ('./pages/Signin'))
 

function App () {
 
  // const navigate  = useNavigate();
  //   const token = localStorage.getItem('token');
  //   console.log(token)
  //   if(token == null){
  //     navigate('/signin')
  //   }

   

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={
            <React.Suspense fallback={<>...</>} >
              <Signup />
              </React.Suspense>}>
          </Route>
          <Route path='/signin' element={ 
            <React.Suspense fallback={<>"....Loading"</>} >  
             <Signin /> 
            </React.Suspense>
         
            }>
            
          </Route>
          <Route path='/blogs' element={<Blogs />}>
            {' '}
          </Route>
          <Route path='/blog/:id' element={<Blog />}></Route>
          {/* <Route path='/publish' element={<Publish/>}></Route> */}
          {/* <Route path='/' element={token? <Blogs/> : <Signin/>}></Route> */}
          {/* everyone can see this main page, but cannot interact with that untill they login and sign up */}
          <Route path='/' element={<Blogs />}></Route>

          {/* <Route path='/singleblogtemplate' element={<SingleBlog id="1" 
  authorName="John Doe" 
  title="Sample Blog Post" 
  content="This is a sample content" 
  publishDate="2024-11-07"  />}></Route> */}
          <Route path='/publish' element={
           <React.Suspense fallback={<>...Loading the Text Editor</>} >
             <TextEditor />
           </React.Suspense>}>

            </Route>
          <Route path='/userprofile' element={<UserProfile />}></Route>
          <Route path='/imageupload' element={<ImageUpload />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
