import { BlogCard } from './BlogCard'
import { sampleBlogs } from '../../lib/blogs'

export function BlogList () {
  return (
    <div className='grid grid-cols-1 gap-8'>
      {sampleBlogs.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
      {/* <BlogCard/> */}
    </div>
  )
}
