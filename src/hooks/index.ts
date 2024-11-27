import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import { toast } from 'react-toastify'

export interface Blog {
  content: string
  title: string
  id: string
  url: string //changed from number
  author: {
    name: string
  }
  // "authorName":string
}

export interface User {
  id: string
  name: string
  email: string
  profilePicture: string
  blogName: string
}

// export function useUserDetails({userId} : {userId : string}){
export function useUserDetails () {
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  try{
  useEffect(() => {
    const getUserDetails = async () => {
      console.log('start fetching user details')

      const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log('got respoonse of user details')
      console.log(response.data)
      setUserDetails(response.data)
      setLoading(false)
    }
    getUserDetails()
  }, [])
}catch(e){
  toast.error("Internal server error / Try Again Please!")
}
  return {
    loading,
    userDetails
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>()

  useEffect(() => {
    const getBlogData = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setBlog(response.data)
      setLoading(false)
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

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(response => {
        setBlogs(response.data.posts)
        console.log('all posts fetching here')
        console.log(response.data.posts)
        setLoading(false)
      })
  }, [])
  return {
    loading,
    blogs
  }
}
