import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

 export interface Blog{
    "content":string,
    "title":string,
    "id":string, 
    "url": string,//changed from number
    "author":{
        "name":string
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
                console.log( "get response from backend for blog " + JSON.stringify(response.data) )
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