import { Search,  Edit, User,} from 'lucide-react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import { Blog } from '../pages/Blog';
const categories = ['For you', 'Following', 'React', 'JavaScript', 'Design', 'Software Development']



export const Navbar = () => {
  const navigate = useNavigate();

  function OpenUserProfile(){
    const token = localStorage.getItem('token')
        if(!token){
          toast.warn("Sign In First", {
            position: "top-right"
          });
        }
      navigate('/userprofile')
  }
function onClick():void {
        const token = localStorage.getItem('token')
        if(!token){
          toast.warn("Login First", {
            position: "top-right"
          });
        }
      navigate('/publish')
}
      const [selectedCategory, setSelectedCategory] = useState('For you')
    return(   
   <nav className=" border-b inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] ">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between h-16">
             <div className="flex">
               <div className="flex-shrink-0 flex items-center">
                 <span className="text-2xl font-bold text-gray-900"><Link to={'/blogs'}> Blog</Link></span>
               </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                 {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                />
              </div>
              {/* <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Bell className="h-6 w-6" />
              </button> */}
              <button onClick={onClick} className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Edit className="h-5 w-5 mr-2" />
                Write
              </button>
              <button onClick={OpenUserProfile} className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <User className="h-6 w-6" ></User>
              </button>
            </div>
          </div>
        </div>
      </nav>    
    )
}
export default Navbar