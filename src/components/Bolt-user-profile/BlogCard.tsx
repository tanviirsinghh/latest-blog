import DOMPurify from 'dompurify'
import {  Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BlogCardProps {
  id: string
  title: string
  content: string
  url: string
  authorName:string
  profilePic:string
  
    like:number,
    comment:number
    saved:number
  

  // authorAvatar: string
  publishDate: string
  // initialLikes: number
  // initialComments: number
}

export function BlogCard ({
  id,
  title,
  content,
  publishDate,
  url,
  // authorAvatar,
  authorName,
  profilePic,
like,
 comment,
 saved
  // initialComments
}: BlogCardProps) {

  // console.log(like, title)
  return (
    <Link to={`/blog/${id}`}>
    <article key={id} className='glass-card rounded-xl  overflow-hidden hover:glow'>
      <div className='relative'>
        <img
          src={url}
          alt={title}
          className='w-full h-48 object-cover '
        />
        {/* <div className='absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent'></div> */}
      </div>
      <div className='p-6'>
        <div className='flex items-center space-x-3 mb-4'>
          <img
            src={profilePic}
            alt={authorName}
            className='h-10 w-10 rounded-full ring-2 ring-primary/30'
          />
          <div>
            <h3 className='font-medium text-gray-100'>{authorName}</h3>
            <p className='text-sm text-gray-400'>{publishDate} read</p>
          </div>
        </div>

        <h2 className='text-xl font-bold text-gray-100 mb-2 hover:text-primary transition-colors cursor-pointer'>
        {title? title.slice(1, 34) + "...": " "}
        </h2>
        <p className='text-gray-400 mb-4' 
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content ? content.slice(1, 80) + "..." : " ")
        }}></p>

        {/* <div className='flex flex-wrap gap-2 mb-4'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='px-3 py-1 rounded-full text-sm glass-effect text-primary'
            >
              {tag}
            </span>
          ))}
        </div> */}

        <div className='flex items-center justify-between pt-4 border-t border-white/10'>
          <div className='flex items-center space-x-4'>
            <h4 className='flex items-center font-mono space-x-1 text-gray-400 hover:text-primary transition-colors'>
            <span className='text-red-500 font-mono'><h4> {like} </h4> </span>
            <span className="rounded-full bg-red-600 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm cursor-default " >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  </span>            </h4>
           
            <h4 className=' font-mono flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors'>
              {/* <MessageCircle className='h-5 w-5' /> */}
              <span className='text-grey-400 font-mono'><h4> {comment} Comments</h4> </span>
            </h4>
            {/* <button className='flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors'>
              <Share2 className='h-5 w-5' />
            </button> */}
          </div>
          <button className='text-grey-400 flex justify-center items-center  hover:text-primary transition-colors'>
            <Bookmark className='h-5 w-5 text-blue-600' />
            <span className='text-blue-500 font-mono p-1'  ><h4> {saved}</h4> </span>

          </button>
        </div>
      </div>
    </article>
   </Link>
  )
}
