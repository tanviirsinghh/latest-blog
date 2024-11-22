import React, { useState } from 'react'
import { Heart, MessageCircle, Bookmark } from 'lucide-react'

interface BlogCardProps {
  id: string
  title: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
  }
  publishDate: string
  initialLikes: number
  initialComments: number
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  image,
  author,
  publishDate,
  initialLikes,
  initialComments
}) => {
  const [likes, setLikes] = useState(initialLikes)
  const [comments, setComments] = useState(initialComments)
  const [isSaved, setIsSaved] = useState(false)

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1)
  }

  const handleSave = () => {
    setIsSaved(prevSaved => !prevSaved)
  }

  return (
    <div className="h-screen w-full flex justify-center items-start">
      <div className="max-w-3xl max-h-56 bg-white rounded-md shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1 p-8">
            <div className="flex items-center mb-4">
              <img className="h-10 w-10 rounded-full mr-2" src="https://picsum.photos/200/300" alt={author.name} />
              <div>
                <p className="text-sm font-semibold text-gray-900">{author.name}</p>
                <p className="text-xs text-gray-600">{publishDate}</p>
              </div>
            </div>
            <h2 className="block mt-1 text-2xl leading-tight font-bold text-black mb-2">{title}</h2>
            <p className="mt-2 text-gray-600">{content.slice(0, 100)}...</p>
            <div className="flex justify-start">
              <div className="mt-4 flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  className="flex items-center text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label="Like post"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{likes}</span>
                </button>
                <button 
                  className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200"
                  aria-label="Comment on post"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{comments}</span>
                </button>
                <button 
                  onClick={handleSave}
                  className={`flex items-center ${isSaved ? 'text-yellow-500' : 'text-gray-700'} hover:text-yellow-500 transition-colors duration-200`}
                  aria-label={isSaved ? "Unsave post" : "Save post"}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-yellow-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center items-center">
            <img className="h-40 w-40 object-fill" src="https://picsum.photos/200/300" alt={title} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Temporary data for demonstration
const tempBlogPost: BlogCardProps = {
  id: '1',
  title: "The Future of AI in Web Development",
  content: "Explore how artificial intelligence is reshaping the landscape of web development and what it means for developers in the coming years. From AI-powered design tools to intelligent coding assistants, the future of web development is exciting and full of possibilities.",
  image: "/placeholder.svg?height=300&width=400",
  author: {
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  publishDate: "May 15, 2023",
  initialLikes: 42,
  initialComments: 10
}

// Render the BlogCard with temporary data
export default function NewSingleBlog() {
  return <BlogCard {...tempBlogPost} />
}