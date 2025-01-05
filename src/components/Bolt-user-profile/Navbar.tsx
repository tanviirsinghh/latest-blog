import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PulsatingButtonDemo } from '../PulsatingButtonDemo'

export default function Navbar () {
  
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

  return (
    <nav className='fixed top-0 w-full left-0 right-0  backdrop-blur-lg border-b border-gray-700/50 z-50'>
      <div className='max-w-7xl  px-4 sm:px-6 lg:px-8  flex items-center justify-center'>
        <div className='flex justify-between w-[39rem] items-center h-16 '>
          <div className='flex items-center '>
            <div className='ml-4 text-3xl font-mono font-bold text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text'>
              <Link to='/blogs'> Large</Link>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-9 w-44  '>
            <PulsatingButtonDemo />
            <button
              onClick={OpenUserProfile}
              className='ml-3 p-1 rounded-full text-gray-300 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              <div className='relative w-10 h-10 bg-sky-100 border-2 border-solid border-sky-600 flex justify-center items-center rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M15.9998 7C15.9998 9.20914 14.2089 11 11.9998 11C9.79067 11 7.99981 9.20914 7.99981 7C7.99981 4.79086 9.79067 3 11.9998 3C14.2089 3 15.9998 4.79086 15.9998 7Z'
                    stroke='#0284C7'
                    strokeWidth='1.6'
                  />
                  <path
                    d='M11.9998 14C9.15153 14 6.65091 15.3024 5.23341 17.2638C4.48341 18.3016 4.10841 18.8204 4.6654 19.9102C5.2224 21 6.1482 21 7.99981 21H15.9998C17.8514 21 18.7772 21 19.3342 19.9102C19.8912 18.8204 19.5162 18.3016 18.7662 17.2638C17.3487 15.3024 14.8481 14 11.9998 14Z'
                    stroke='#0284C7'
                    strokeWidth='1.6'
                  />
                </svg>
                <span className='bottom-0 left-7 absolute  w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full'></span>
              </div>{' '}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
