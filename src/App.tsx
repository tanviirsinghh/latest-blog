import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import Signup from './pages/Signup'
// import Signin from './pages/Signin'
// import Blogs from './pages/Blogs'
// import { Blog } from './pages/Blog'
// import { Publish } from './pages/Publish'
// import Signin from './pages/Signin'
// import Home from './pages/Home'
// import TextEditor from './pages/TextEditor';
// import { ToastContainer } from 'react-toastify'
// import UserProfile from './pages/UserProfile';
// import ImageUpload from './components/ImageUpload';

// Implementing lazy loading
const Signup = React.lazy(()=> import ('./pages/Signup'))
const Signin = React.lazy(()=> import ('./pages/Signin'))
const Blogs = React.lazy(()=> import ('./pages/Blogs'))
const Blog = React.lazy(()=> import ('./pages/Blog'))
const TextEditor = React.lazy(()=> import ('./pages/WriteBlog'))
const UserProfile = React.lazy(()=> import ('./pages/UserProfile'))

 

function App () {
 
  // const navigate  = useNavigate();
    const token = localStorage.getItem('token');
    // console.log(token)
    

   

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
          <Route path='/blogs' element={ 
            <React.Suspense fallback={<>"....Loading"</>} >  
             <Blogs /> 
            </React.Suspense>
         
            }>
            
          </Route>
          <Route path='/blog/:id' element={ 
            <React.Suspense fallback={<>"....Loading"</>} >  
             <Blog /> 
            </React.Suspense>
         
            }>
            
          </Route>
          {/* <Route path='/publish' element={<Publish/>}></Route> */}
          {/* <Route path='/' element={token? <Blogs/> : <Signin/>}></Route> */}
          {/* everyone can see this main page, but cannot interact with that untill they login and sign up */}
          <Route path='/blog' element={ 
            <React.Suspense fallback={<>"....Loading"</>} >  
             <Blog /> 
            </React.Suspense>
         
            }>
            
          </Route>

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
         
         

            <Route path='userprofile' element={ 
            <React.Suspense fallback={<>"....Loading"</>} >  
             {token?  <UserProfile /> : <Signin/> }
            </React.Suspense>
         
            }>
            
          </Route>
          {/* <Route path='/imageupload' element={<ImageUpload />}></Route> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
