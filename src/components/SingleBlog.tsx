import DOMPurify from 'dompurify'
import { Star, ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children?: ReactNode
  className?: string
  variant?: string
  size?: string
  onClick?: () => void
}

const Card = ({ children, className = '' }: Props) => (
  <div className={`bg-white drop-shadow-lg rounded-md ${className}`}>
    {children}
  </div>
)
const CardContent = ({ children, className = '' }: Props) => (
  <div className={`p-6 ${className}`}>{children}</div>
)
const Avatar = ({ children, className = '' }: Props) => (
  <div
    className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}
  >
    {children}
  </div>
)
const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}: Props) => (
  <button
    className={`
      ${
        variant === 'ghost'
          ? 'bg-transparent hover:bg-gray-100'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }
      ${size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2'}
      rounded ${className}
    `}
    {...props}
  >
    {children}
  </button>
)
interface BlogPost {
  id: string
  authorName: string
  title: string
  content: string
  publishDate: string
}


export default function SingleBlog ({
  id,
  authorName,
  title,
  content,
  publishDate

}: BlogPost) {

  return (
    <Link to={`/blog/${id}`}>
      <div className='w-[50rem]  h-full m-2 '>
        <Card key={id} className='border w-full   '>
          <CardContent className='p-8  '>
            <div className='flex items-start space-x-4'>
              <div className='flex-grow'>
                <div className='flex items-center space-x-2 mb-2'>
                  <Avatar className='h-6 w-6'>
                  </Avatar>
                  <span className='text-sm font-medium'>{authorName}</span>
                  <span className='text-sm text-gray-500'>in</span>
                </div>
                <h2 className='text-xl font-bold mb-2'>{title}</h2>
                <p
                  className='text-gray-600 mb-4'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content ? content.slice(1, 100) : " " + '....')
                  }}
                ></p>
                <div className='flex items-center text-sm text-gray-500 space-x-4'>
                  <span>{publishDate}</span>
                  <span>·</span>
                  <span>·</span>
                  <div className='flex items-center'>
                    <Star className='h-4 w-4 mr-1' />
                    <span>Member-only</span>
                  </div>
                  <div className='flex-grow' />
                  <div className='flex items-center space-x-4'>
                    <Button variant='ghost' size='sm' className='text-gray-500'>
                      <ThumbsUp className='h-4 w-4 mr-1' />
                    </Button>
                    <Button variant='ghost' size='sm' className='text-gray-500'>
                      <MessageSquare className='h-4 w-4 mr-1' />
                    </Button>
                    <Button variant='ghost' size='sm' className='text-gray-500'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  )
}
