import { BlogCard } from './BlogCard'
import { BlogSkeleton } from '../BlogSkeleton'
import Navbar from './Navbar'
import { useBlogs } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export function BlogList () {
  const { loading, blogs } = useBlogs()
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8; // Adjust as needed
  const navigate = useNavigate()
  if (!localStorage.getItem('token')) {
    navigate('/signin')
  }


  const totalPages = Math.ceil((blogs?.length || 0) / blogsPerPage);

  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className='flex justify-center '>
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
    <div className='grid grid-cols-1 gap-8 '>
      {currentBlogs.map((blog) => (
        <BlogCard key={blog.id}
        id={blog.id}
        authorName={blog.author.name || 'Anonymous'}
        title={blog.title}
        content={blog.content}
        publishDate='treek'
                url={blog.url}
        profilePic={blog.author.profilePicture}
        like={blog._count.like}
        comment={blog._count.comment}
        saved={blog._count.savedPosts}
         />
      ))}
     {blogs.length > blogsPerPage && (
        <div className='flex justify-center items-center gap-4 mt-8 pb-8'>
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1} className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
    <span>
      Previous
    </span>
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
          
          <span className='text-indigo-500 font-bold font-mono'>
            Page <span className='text-gray-300 font-sans'>{currentPage}</span> of <span className='text-gray-300 font-sans'>{totalPages}</span>
          </span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages} className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
    <span>
      Next
    </span>
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
        </div>
      )}
    </div>
  )
}
