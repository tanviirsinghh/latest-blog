import DOMPurify from "dompurify";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";


interface BlogCardProps {
    id: string
    title: string
    content: string
    url: string
    authorName:string
  
    authorAvatar: string
    publishDate: string
    initialLikes: number
    initialComments: number
  }
export default function AuthorPosts(  {
    id,
    title,
    content,
    // publishDate,
    url,
    // authorAvatar,
    // authorName,
    // initialLikes,
    // initialComments
} : BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div>
      <div key={id} className='group'>
                      <div className='flex gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900/70 transition-colors cursor-pointer'>
                        <img
                          src={url}
                          alt={title}
                          className='w-24 h-24 rounded-lg object-cover'
                        />
                        <div className='flex-1'>
                          <h3 className='font-medium text-lg text-white group-hover:text-cyan-400 transition-colors'>
                            {title}
                          </h3>
                          <p className='text-gray-400 text-sm mt-1 line-clamp-2' 
                          dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content ? content.slice(1, 80) + "..." : " ")
                  }}></p>

                          <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                            <span>{"post.date"}</span>
                            <span>•</span>
                            <span>{"post.readTime"} read</span>
                            <span>•</span>
                            <span>{"post.views"} views</span>
                          </div>

                          <div className='flex items-center gap-6 mt-3'>
                            <button className='flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors'>
                              <Heart size={18} />
                              <span>{"post.likes"}</span>
                            </button>
                            <button className='flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors'>
                              <MessageCircle size={18} />
                              <span>{"post.comments"}</span>
                            </button>
                            <button className='flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors'>
                              <Bookmark size={18} />
                            </button>
                            <button className='flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors'>
                              <Share2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
    </div>
    </Link>
  )
}
