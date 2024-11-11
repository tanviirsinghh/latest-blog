import { useBlogs } from '../hooks'
import { BlogSkeleton } from '../components/BlogSkeleton'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SingleBlog from '../components/SingleBlog'
import Sidebar from '../components/Sidebar'
import LowerSidebar from '../components/LowerSidebar'

export const Blogs = () => {
  const date = new Date()
  const { loading, blogs } = useBlogs()
  const navigate = useNavigate()
  if (!localStorage.getItem('token')) {
    navigate('/signin')
  }
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className='flex justify-center'>
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='w-full h-full'>
        <div className='fixed w-full h-[4rem]  '>
          <Navbar />
        </div>
        <div className='flex  w-full min-h-screen inset-0 -z-10  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]  '>
          <main className='flex justify-center w-full  pt-16  '>
            <div className=' flex flex-col  w-[50rem]  lg:flex-row '>
              <div className=' h-full w-[90rem] flex justify-center items-center'>
                <div className=' h-full w-full flex flex-col justify-between items-center p-8  '>
                  {blogs.map(blog => (
                    <SingleBlog
                      id={blog.id}
                      authorName={blog.author.name || 'Anonymous'}
                      title={blog.title}
                      content={blog.content}
                      publishDate={date.toString()}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className=' w-[26rem] relative flex-col'>
              <div className='fixed right-40 top-20'>
                <Sidebar />
              </div>
              <div className='fixed right-38 bottom-8'>
                <LowerSidebar />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Blogs
