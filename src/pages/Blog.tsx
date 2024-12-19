// import { FullBlog } from "../components/FullBlog";
// import { Spinner } from "../components/Spinner";
import {  useBlog } from "../hooks";

import {useNavigate, useParams} from "react-router-dom";
import Navbar from '../components/Bolt-user-profile/Navbar'
// import NewFullBlog from './NewFullBlog';
import BoltFullBlog from "../components/Bolt-user-profile/BoltFullBlog";


// atomFamilies/selectorFamilies
export default function  Blog  () {
     const navigate = useNavigate()
  
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(!localStorage.getItem("token")){
        navigate('/signin')
        return 
   }
    // console.log(blog)
       if(loading){
        return <div>
            loading...
        </div>
       }
    if (loading || !blog) {
        return <div>
            <Navbar/>       
            fuckofs 
            <div className="h-screen flex flex-col justify-center">
               
                <div className="flex justify-center">
                   loading...
                </div>
            </div>
        </div>
    }
    return <div>
   {/* <FullBlog blog={blog!} /> */}
   {/*  in blog! we are telling the typescript that blog object is not null, trust me and render, */}
   {/* <NewFullBlog blog={blog!}/> */}
  { blog && <BoltFullBlog blog={blog!}/>}
   {/* {blogData && <BoltFullBlog blog={blogData} />} */}

    </div>
}