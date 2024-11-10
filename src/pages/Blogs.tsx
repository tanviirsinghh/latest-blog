

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


<>
<Navbar/>
<div className=" relative min-h-screen inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]  ">
     
<main className="mx-32">
        <div className="flex flex-col   lg:flex-row ">
            <div className=' h-full w-[90rem] flex justify-center items-center'>
            <div className=' h-full w-full flex flex-col justify-between items-center p-8  '>
        {blogs.map(blog => <SingleBlog
  id={blog.id}
  authorName={blog.author.name || "Anonymous"}
  title={blog.title}
  content={blog.content}
  publishDate={date.toString()}
/>)}
</div>
</div>
          <div className="bg-green-900 relative ">
           <Sidebar/>

            <LowerSidebar/>
          </div>
          </div>

 {/* a quick brown fox jumps over the lazy dog a quick brown fox jumps over the lazy dog a quick brown fox jumps over the lazy dog a quick brown  */}
        
        
      </main>
    </div>
   
    </>
    )

}

export default Blogs



