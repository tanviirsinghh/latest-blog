import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

 export interface Blog{
    "content":string,
    "title":string,
    "id":string, //changed from number
    "author":{
        "name":string
    }
    
}

export const useBlog = ({ id }: { id: string }) => {
    const navigate = useNavigate()
    if(!localStorage.getItem("token")){
         navigate('/signin')
    }
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data);
                // console.log(response)
                // console.log(response.data)
                setLoading(false);
            })
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
                console.log(localStorage.getItem("token"))
              setBlogs(response.data.posts)
              setLoading(false)
            })
        
    },[])
    return{
        loading,
        blogs
    }

}