import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        console.log('start fetching user details');
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found'); // Handle the case where the token is missing
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token format is correct
          },
        });
        
        console.log('got response of user details', response.data);
        setUserDetails(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error('Unauthorized. Please sign in again.');
            navigate('/signin'); // Redirect to sign-in page
          } else if (error.response?.status === 500) {
            toast.error('Internal server error. Please try again.');
          }
          else if (error.response?.status === 404) {
          toast.error('User Not Found');
          navigate('/signin'); // Redirect to sign-in page
        }
        } else {
          console.error('Unexpected error:', error);
          toast.error('An unexpected error occurred.');
        }
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getUserDetails();
  }, [navigate]); // for safety
  
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
