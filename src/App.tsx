
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
// import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
import Signin from './pages/Signin'
// import NewCard from './components/NewCard'
// import Home from './pages/Home'
import Vishal from './components/Vishal'
import SingleBlog from './components/SingleBlog'
import NewCard from './components/NewCard'
// import Latest from './components/Latest'
// import  Background  from './pages/Signin'
function App() {
  
  // const navigate  = useNavigate();
    const token = localStorage.getItem('token');
    // console.log(token)
    // if(token == null){
    //   navigate('/signin')
    // }

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path='/signup' element={<Signup/>}> </Route>
  <Route path='/signin' element={<Signin/>}> </Route>
  <Route path='/blogs' element={<Blogs/>}> </Route>
  <Route path="/blog/:id" element={<Blog/>}></Route>
  <Route path='/publish' element={<Publish/>}></Route>
  <Route path='/' element={token? <Blogs/> : <Signin/>}></Route>
  <Route path = '/singleblogtemplate' element={<SingleBlog/>}></Route>
 


  {/* <Route path='/latest' element={<Latest/>}></Route> */}




  </Routes></BrowserRouter>      
    </>
  )
}

export default App
