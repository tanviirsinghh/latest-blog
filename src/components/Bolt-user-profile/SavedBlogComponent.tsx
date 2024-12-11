import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BlogCardProps {
  id: string
  title: string
  content: string
  url: string
  publishDate: string
  authorName: string
  authorId: string
}

export default function SavedBlogComponent ({
  id,
  title,
  url,
  authorName,
  authorId,
  publishDate
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className='space-y-4'>
        <div
          key={id}
          className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/50 transition-colors cursor-pointer'
        >
          <img
            src={url}
            alt={authorName}
            className='w-12 h-12 rounded-lg object-cover'
          />
          <div className='flex-1 min-w-0'>
            <h3 className='font-medium text-white truncate'>{title}</h3>
            <div className='flex items-center gap-2 mt-1 text-sm'>
              <Link to={`/details/${authorId}`}>
                <span className='text-gray-400 hover:text-blue-400'>
                  {authorName}
                </span>
              </Link>
              <span className='text-gray-600'>•</span>
              <div className='flex items-center gap-1 text-gray-500'>
                <Clock size={14} />
                <span>{publishDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
