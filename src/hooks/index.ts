import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
// import SavedBlogs from '../components/UserProfile.tsx/SavedBlogs';

export interface Blog {
  content: string
  title: string
  id: string
  url: string //changed from number
  author: {
    name: string
  }
  authorId: string
  // "authorName":string
}
export interface SavedBlog {
  content: string
  title: string
  id: string
  url: string
  authorId: string //changed from number
  author: {
    name: string
  }
  // "authorName":string
}
// interface Post {
//   id: string;
//   title: string;
//   url: string;
//   author: {
//     name: string;
//   };
// }

export interface SavedPost {
  savedblog: SavedBlog
}

export interface User {
  id: string
  name: string
  email: string
  profilePicture: string
  blogName: string
  bio: string
  location: string
  coverpicture: string
}

// export function useUserDetails({userId} : {userId : string}){
export function useUserDetails () {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // const id = useParams()
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        console.log('start fetching user details')

        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token Undefined')
          // Handle the case where the token is missing
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
          headers: {
            Authorization: `Bearer ${token}` // Ensure the token format is correct
          }
        })

        setUserDetails(response.data.userData)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error('Unauthorized. Please sign in again.')
            navigate('/signin') // Redirect to sign-in page
          } else if (error.response?.status === 500) {
            toast.error('Internal server error. Please try again.')
            navigate('/signin') // Redirect to sign-in page
          } else if (error.response?.status === 404) {
            toast.error('User Not Found')
            navigate('/signin') // Redirect to sign-in page
          }
        } else {
          // console.error('Unexpected error:', error);
          toast.error('An unexpected error occurred.')
          navigate('/signin') // Redirect to sign-in page
        }
      } finally {
        setLoading(false) // Ensure loading state is updated
      }
    }

    getUserDetails()
  }, [navigate]) // for safety

  return {
    loading,
    userDetails,
    setUserDetails
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>()
  const navigate = useNavigate()
  useEffect(() => {
    const getBlogData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found. Redirecting to login...')
        navigate('/signin')
        return
      }
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: { Authorization: token }
        })
        setBlog(response.data)
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }
    getBlogData()
  }, [id])

  return {
    loading,
    blog
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found. Redirecting to login...')
        navigate('/signin')
        return
      }
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: { Authorization: token }
        })
        setBlogs(response.data.posts)
        console.log(response.data.posts)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])
  return {
    loading,
    blogs
  }
}
//  personal blogs

export const useBlogsPersonal = (authorId?: string) => {
  const [loading, setLoading] = useState(true)
  const [blogsPersonal, setBlogsPersonal] = useState<Blog[]>([])
  const navigate = useNavigate()
  // const location = useLocation()
  useEffect(() => {
    const fetchBlogs = async () => {
      console.log('user blog personal hook')
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found. Redirecting to login...')
        navigate('/signin')
        return
      }
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { authorId }, // Dynamically pass authorId
        });
        setBlogsPersonal(response.data.posts)
        console.log(response.data.posts)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])
  return {
    loading,
    blogsPersonal
  }
}

export const useSavedBlogs = () => {
  const [loadingsavedblogs, setloadingsavedblogs] = useState(true)
  const [savedblogs, setSavedBlogs] = useState<SavedBlog[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchSavedBlogs = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found. Redirecting to login...')
        navigate('/signin')
        return
      }
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/savedblogs`,
          {
            headers: { Authorization: token }
          }
        )
        // const saved = response.data.savedPosts
        setSavedBlogs(response.data)
        // console.log("saved blogs" + JSON.stringify(response.data.saved))
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setloadingsavedblogs(false)
      }
    }
    fetchSavedBlogs()
  }, [])
  return {
    loadingsavedblogs,
    savedblogs
  }
}
