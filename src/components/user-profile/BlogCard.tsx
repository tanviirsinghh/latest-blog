import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'

interface BlogCardProps {
  id: string
  title: string
  content: string
  url: string
  authorName: string
  profilePic: string
  like: number
  comment: number
  saved: number
  publishDate: string
}

export function BlogCard ({
  id,
  title,
  content,
  publishDate,
  url,
  authorName,
  profilePic,
  like,
  comment,
  saved
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <article
        key={id}
        className='glass-card rounded-xl  overflow-hidden hover:glow'
      >
        <div className='relative'>
          <img src={url} alt={title} className='w-full h-48 object-cover ' />
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
              <p className='text-sm text-gray-400'>{publishDate} </p>
            </div>
          </div>

          <h2 className='text-xl font-bold text-gray-100 mb-2 hover:text-primary transition-colors cursor-pointer'>
            {title ? title.slice(1, 34) + '...' : ' '}
          </h2>
          <p
            className='text-gray-400 mb-4'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                content ? content.slice(1, 80) + '...' : ' '
              )
            }}
          ></p>
          <div className='flex items-center justify-between pt-4 border-t border-white/10'>
            <div className='flex items-center space-x-4'>
              <h4 className='flex items-center font-mono space-x-1 text-gray-400 hover:text-primary transition-colors'>
                <span className='text-red-500 font-mono'>
                  <h4> {like} </h4>{' '}
                </span>

                <img className='h-5' src='/src/assets/3d-fire.png' alt='' />
              </h4>

              <h4 className=' font-mono flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors'>
                <span className='flex items-center'>
                  <h4 className='text-grey-400 font-mono'> {comment} </h4>
                  <img
                    className='h-7'
                    src='/src/assets/comment.png'
                    alt=''
                  />{' '}
                </span>
              </h4>
            </div>
            <button className='text-grey-400 flex justify-center items-center  hover:text-primary transition-colors'>
              <img className='h-7' src='/src/assets/bookmark.png' alt='' />
              <span className='text-blue-500 font-mono p-1'>
                <h4> {saved}</h4>{' '}
              </span>
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}
