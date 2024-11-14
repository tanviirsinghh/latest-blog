import { Blog } from '../hooks/index'
import { Avatar } from './BlogCard'
import DOMPurify from 'dompurify'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate()

  if (!localStorage.getItem('token')) {
    navigate('/signin')
    return
  }
  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className='grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12'>
          <div className='col-span-9'>
            <div className='h-[23rem] w-2/4 bg-pink-700 '>
              <img className='h-full w-full' src={blog.url} />
            </div>
            <div className=' bg-green-700 text-4xl font-extrabold break-words'>
              {blog.title}
            </div>
            <div className='text-slate-500 pt-2 '>
              Post on 2nd December 2023
            </div>
            <div
              className='pt-4 flex flex-col break-words'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content)
              }}
            ></div>
          </div>
          <div className='col-span-3  ml-8'>
            <div className='text-slate-600 text-lg'>Author</div>
            <div className='flex w-full'>
              <div className='pr-4 flex flex-col justify-center'>
                <Avatar size='big' name={blog.author.name || 'Anonymous'} />
              </div>
              <div>
                <div className='text-xl font-bold'>
                  {blog.author.name || 'Anonymous'}
                </div>
                <div className='pt-2 text-slate-500'>
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
