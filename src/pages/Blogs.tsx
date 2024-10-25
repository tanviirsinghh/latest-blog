

// import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../hooks';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useNavigate } from 'react-router-dom';
// import NewCard from '../components/NewCard';
import Navbar from '../components/Navbar';
import SingleBlog from '../components/SingleBlog';
import Sidebar from '../components/Sidebar';
import LowerSidebar from '../components/LowerSidebar';


export const Blogs = () => {

    const date = new Date();
    const {loading,blogs} = useBlogs()
    const navigate = useNavigate()
    if(!localStorage.getItem("token")){
         navigate('/signin')
    }
    if(loading){
        return <div>
        <Navbar /> 
        <div  className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>
    }
    return(
//       <div>
//         <div><Navbar></Navbar></div>
//         {blogs.map(blog => <SingleBlog
//   id={blog.id}
//   authorName={blog.author.name || "Anonymous"}
//   title={blog.title}
//   content={blog.content}
//   publishDate={"fetch date here"}
// />)}

//        </div>



<div className="min-h-screen ">
      <Navbar/>
<main className="mx-32 ">
        <div className="flex flex-col  lg:flex-row ">
            <div>
        {blogs.map(blog => <SingleBlog
  id={blog.id}
  authorName={blog.author.name || "Anonymous"}
  title={blog.title}
  content={blog.content}
  publishDate={date.toString()}
/>)}
</div>
          <div className="">
           <Sidebar/>

            <LowerSidebar/>
          </div>
          </div>


        
        
      </main>
    </div>
   

    )

}

export default Blogs



