import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from '../config';
import { getUserDetails } from './index';

 export interface Blog{
    "content":string,
    "title":string,
    "id":string, 
    "url": string,//changed from number
    "author":{
        "name":string
    }
    // "authorName":string
   
}

export interface User{
    "id": string,
    "name": string,
    "email": string,
    "profilePicture":string,
    "blogName":string
}

export function useUserDetails({id} : {id : string}){
    const [userDetails, setUserDetails] = useState<User>()
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getUserDetails = async () =>{

        
      const response = await axios.get(`${BACKEND_URL}/api/v1/userDetails/${id}`,{
        headers: {
            Authorization: localStorage.getItem("token")
        }
      })
      setUserDetails(response.data)
      setLoading(false)
    }
    getUserDetails()
    },[id])
    return {
        loading, 
        userDetails
    }
}


export const useBlog =  ({ id }: { id: string }) => {
   
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
       
   
    useEffect(() => {
        const getBlogData = async ()=>{
       const response =  await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
                // const blogData = response.data.data;
                // console.log("getting url from the get api "+ blogData) // getting undefined
                setBlog(response.data);
                // console.log("data fetched from backend " + blogData)
                setLoading(false);
           
        }
        getBlogData();
    }, [id])

    return {
        loading,
        blog
    }

}

export const useBlogs= ()=>{
    const[loading,setLoading] = useState(true)
    const[blogs,setBlogs] = useState<Blog[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
               
              setBlogs(response.data.posts)
              console.log('all posts fetching here')
              console.log(response.data.posts )
              setLoading(false)
            })
        
    },[])
    return{
        loading,
        blogs
    }

}