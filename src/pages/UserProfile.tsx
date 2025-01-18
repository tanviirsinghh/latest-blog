import ProfileInfo from '../components/UserProfile.tsx/ProfileInfo'
import SavedBlogs from '../components/UserProfile.tsx/SavedBlogs'
import MyActivities from '../components/UserProfile.tsx/MyActivities'
import Navbar from '../components/Bolt-user-profile/Navbar'
import { useUserDetails } from '../hooks/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { toast } from 'react-toastify'
import Loading from '../components/Loading';
import { useCallback, useEffect } from 'react'

export default function UserProfile () {
  const navigate = useNavigate()
  const { loading, userDetails, setUserDetails } = useUserDetails()
  const token = localStorage.getItem('token')

  // Memoize the function with useCallback since it's used in JSX
  const getRefreshData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
        headers: {
          Authorization: `${token}`
        }
      })
      console.log('Got refresh response of user details', response.data)
      setUserDetails(response.data)
    } catch (error) {
      console.error('Error fetching user details:', error)
      toast.error('Failed to refresh user details.')
    }
  }, [token, setUserDetails]) // Include dependencies used inside the function

  useEffect(() => {
    if (!token) {
      toast.error('Log In First')
      navigate('/signin')
      return
    }

    getRefreshData()
  }, [token, navigate, getRefreshData])

  if (loading || !userDetails) {
    return <div><Loading/></div>
  }

  return (
    <>
      <Navbar />
      <div className='h-[60rem] w-full inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] '>
        <div className='h-[34rem] w-full  flex flex-col justify-center items-center'>
          <div className='h-16 w-56  flex justify-center items-center '>
            <h1 className='text-3xl font-bold font-sans '>User Profile</h1>
          </div>
          <div className='h-3/4 w-3/4 flex justify-evenly items-center  '>
            <ProfileInfo user={userDetails!} getRefreshData={getRefreshData} />
            {/* <SavedBlogs /> */}
          </div>
        </div>
        <div className=' h-1/3 flex justify-center items-center '>
          <MyActivities />
        </div>
      </div>
    </>
  )
}
