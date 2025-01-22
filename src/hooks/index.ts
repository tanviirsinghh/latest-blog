import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { format, differenceInHours } from 'date-fns';

export interface Blog {
  content: string
  title: string
  id: string
  url: string 
  _count:{
    like:number,
    comment:number
    savedPosts:number
  }
  author: {
    name: string,
    profilePicture:string
  }
  authorId: string
}
export interface EditButton{
  editButton:  boolean
}
export interface SavedBlog {
  content: string
  title: string
  id: string
  url: string
  authorId: string
  _count:{
    like:number,
    comment:number
    savedPosts:number
  }
  author: {
    name: string
  }
}

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
  posts: Blog[]
}

export function useUserDetails (authorId?: string) {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token Undefined')
      
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
          headers: {
            Authorization: `Bearer ${token}` 
           
          },
          params: { authorId }
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
  }, [authorId]) // for safety

  return {
    loading,
    userDetails,
    setUserDetails
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>()
  const [editButton, setEditButton] = useState()

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
        setBlog(response.data.post)
        setEditButton(response.data.editButton)
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
    blog,
    editButton
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

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found. Redirecting to login...')
        navigate('/signin')
        return
      }
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/posts`, {
          headers: { Authorization: token },
          params: { authorId }
          // Pass authorId here
        })
        setBlogsPersonal(response.data.posts)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [authorId]) // Dependency on authorId to refetch when it changes

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
        setSavedBlogs(response.data)
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

export default function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();

  if (differenceInHours(now, date) < 24) {
    // Show time if less than 24 hours
    return format(date, 'hh:mm a'); // Example: "02:15 PM"
  } else {
    // Show date if more than 24 hours
    return format(date, 'MMM d, yyyy'); // Example: "Dec 18, 2024"
  }
}
