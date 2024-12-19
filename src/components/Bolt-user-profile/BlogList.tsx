import { BlogCard } from './BlogCard'
import { BlogSkeleton } from '../BlogSkeleton'
import Navbar from './Navbar'
import { useBlogs } from '../../hooks'
import { useNavigate } from 'react-router-dom'

export function BlogList () {
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
    <div className='grid grid-cols-1 gap-8'>
      {blogs.map((blog) => (
        <BlogCard key={blog.id}
        id={blog.id}
        authorName={blog.author.name || 'Anonymous'}
        title={blog.title}
        content={blog.content}
        publishDate=" save the date also and then fetch here"
        url={blog.url}
        like={blog._count.like}
        comment={blog._count.comment}
        saved={blog._count.savedPosts}

        // make user upload the photo then fetch here
        // authorAvatar=''
        // initialLikes= {1}
        // initialComments={5}
         />
      ))}
      {/* <BlogCard/> */}
    </div>
  )
}
