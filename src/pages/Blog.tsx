import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
// import { Spinner } from "../components/Spinner";
import {  useBlog } from "../hooks";

import {useNavigate, useParams} from "react-router-dom";


// atomFamilies/selectorFamilies
export const Blog = () => {
     const navigate = useNavigate()
    if(!localStorage.getItem("token")){
         navigate('/signin')
    }
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    // console.log(blog)
       if(loading){
        return <div>
            loading...
        </div>
       }
    if (loading || !blog) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
               
                <div className="flex justify-center">
                   loading...
                </div>
            </div>
        </div>
    }
    return <div>
   <FullBlog blog={blog!} />
     
    </div>
}