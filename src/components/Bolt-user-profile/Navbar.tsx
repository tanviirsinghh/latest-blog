import { Menu, Search, Bell, PenSquare, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default  function Navbar () {

  const navigate = useNavigate()
  function OpenUserProfile () {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.warn('Sign In First', {
        position: 'top-right'
      })
    }
    navigate('/userprofile')
  }
  function onClick (): void {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.warn('Login First', {
        position: 'top-right'
      })
    }
    navigate('/publish')
  }
  return (
    <nav className="fixed top-0 left-0 right-0  bg-white/1s0 backdrop-blur-md border-b border-white/20 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
        <button className="p-2 rounded-lg hover:bg-white/10 lg:hidden">
          <Menu className="h-6 w-6 text-gray-300" />
        </button>
        <div className="ml-4 text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-primary bg-clip-text">
          <Link to="/blogs">DevBlog</Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition"
          onClick={onClick}
        >
          <PenSquare className="h-5 w-5" />
          <span>Write</span>
        </button>

        <button className="p-2 rounded-full hover:bg-white/10 relative">
          <Bell className="h-6 w-6 text-gray-300" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
        </button>

        <button
          onClick={OpenUserProfile}
          className="ml-3 p-1 rounded-full text-gray-300 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <User className="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
</nav>

  
  )
}
