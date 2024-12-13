import React, { useState } from 'react'
import { Heart, MessageCircle, Bookmark } from 'lucide-react'
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'


//we are using this but only for the all blogs template

interface BlogCardProps {
  id: string
  title: string
  content: string
  url: string
  author:{
    name:string
  }
  authorAvatar: string
  publishDate: string
  initialLikes: number
  initialComments: number
}

export default function NewSingleBlog ({
  id,
  title,
  content,
  publishDate,
  url,
  authorAvatar,
  author,
  initialLikes,
  initialComments
}: BlogCardProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [comments, setComments] = useState(initialComments)
  const [isSaved, setIsSaved] = useState(false)

  const handleLike = () => {
    // prevLikes => { ... } is an arrow function where prevLikes refers to the current value of the state before the update.
    // React automatically passes the previous state as an argument when you call the state updater with a function.

    // Why is this needed?
    // When updating state that depends on the previous state, it's safer to use a function form to avoid potential bugs due to stale state values.

    
  }

  const handleSave = () => {
    setIsSaved(prevSaved => !prevSaved)
  }

  return (
    <Link to={`/blog/${id}`}>

    <div className='w-[47rem] h-full m-2'>


   
      <div key={id} className='border h-[13rem] w-full flex justify-evenly items-center bg-white rounded-md drop-shadow-lg'>
        <div  className=' h-full p-2  w-[49rem] md:flex '>
          <div className='pl-6  w-full flex-col'>
            <div className='flex mb-2'>
              <img
                className='h-10 w-10 rounded-full mr-2'
                src={authorAvatar}
                alt={author.name}
              />
              <div className=''>
                <p className='text-sm font-semibold text-gray-900'>
                  {author.name}
                </p>
                <p className='text-xs text-gray-600'>{publishDate}</p>
              </div>
            </div>
            <h2 className='block  text-2xl leading-tight font-bold text-black mb-2'>
              {title? title.slice(1, 34) + "...": " "}
            </h2>
            <p className='mt-2 text-gray-600' 
             dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content ? content.slice(1, 80) + "..." : " ")
                  }}></p>
            <div className='flex justify-start'>
              <div className='mt-4 flex items-center space-x-4'>
                <button
                  onClick={handleLike}
                  className='flex items-center text-gray-700 hover:text-red-500 transition-colors duration-200'
                  aria-label='Like post'
                >
                
                  <Heart
                    className={`h-4 w-4 mr-1 `}
                  />
                  <span>{likes}</span>
                </button>
                <button
                  className='flex items-center text-gray-700'
                  aria-label='Comment on post'
                >
                  <MessageCircle className='h-4 w-4 mr-1' />
                  <span>{comments}</span>
                </button>
                <button
                  onClick={handleSave}
                  className={`flex items-center ${
                    isSaved ? 'text-yellow-500' : 'text-gray-700'
                  } hover:text-yellow-500 transition-colors duration-200`}
                  aria-label={isSaved ? 'Unsave post' : 'Save post'}
                >
                  <Bookmark
                    className={`h-4 w-4 ${isSaved ? 'fill-yellow-500' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
          {/* img */}
          <div className=' md:w-1/3 flex justify-center items-center'>
            <img
              className='h-40 w-40 object-fill rounded-md'
              src={url}
              alt={title}
            />
          </div>
        </div>
      </div>
    </div>
    
</Link>
  )
}
