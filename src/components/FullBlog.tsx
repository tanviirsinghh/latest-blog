import { Blog } from '../hooks/index'
import { Avatar } from './BlogCard'
import DOMPurify from 'dompurify'
import { useNavigate } from 'react-router-dom'
import Navbar from './Bolt-user-profile/Navbar'



// Not using this


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






//  latest design from the v0 appliaction


// import React, { useState } from 'react';
// import { Heart, MessageCircle, Share2, Bookmark, Twitter, Linkedin, GitlabIcon as GitHub, ChevronRight, X } from 'lucide-react';

// export default function EnhancedUserBlogPage() {
//   const [user, setUser] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     bio: 'Passionate writer and tech enthusiast. I love exploring new technologies and sharing my insights with the world.',
//     avatar: '/placeholder.svg?height=150&width=150',
//     socialLinks: {
//       twitter: 'https://twitter.com/johndoe',
//       linkedin: 'https://linkedin.com/in/johndoe',
//       github: 'https://github.com/johndoe',
//     },
//   });

//   const [blog, setBlog] = useState({
//     title: 'The Future of Artificial Intelligence in Web Development',
//     description: 'Explore how AI is revolutionizing the way we build and interact with websites, and what this means for developers and users alike.',
//     content: `Artificial Intelligence is rapidly transforming various industries, and web development is no exception. In this post, we'll dive deep into how AI is changing the landscape of web development, discussing topics such as:

// 1. AI-powered design tools
// 2. Intelligent chatbots and virtual assistants
// 3. Personalized user experiences
// 4. Automated testing and bug detection
// 5. The ethical considerations of AI in web development

// Join me on this exciting journey as we explore the cutting-edge advancements in AI and their impact on the future of web development.`,
//     image: '/placeholder.svg?height=400&width=800',
//     date: '2023-05-15',
//     readTime: '5 min read',
//     likes: 42,
//     comments: [
//       { id: 1, author: 'Alice', content: 'Great article! Very insightful.', date: '2023-05-16' },
//       { id: 2, author: 'Bob', content: 'I\'m excited to see how AI will shape the future of web development.', date: '2023-05-17' },
//     ],
//   });

//   const [relatedBlogs, setRelatedBlogs] = useState([
//     {
//       id: 1,
//       title: 'Machine Learning in Frontend Development',
//       author: 'Jane Smith',
//       date: '2023-05-10',
//       readTime: '4 min read',
//       image: '/placeholder.svg?height=80&width=120',
//     },
//     {
//       id: 2,
//       title: 'The Rise of AI-Assisted Coding',
//       author: 'Mike Johnson',
//       date: '2023-05-12',
//       readTime: '6 min read',
//       image: '/placeholder.svg?height=80&width=120',
//     },
//     {
//       id: 3,
//       title: 'Ethical Considerations in AI Development',
//       author: 'Sarah Lee',
//       date: '2023-05-14',
//       readTime: '5 min read',
//       image: '/placeholder.svg?height=80&width=120',
//     },
//   ]);

//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [showShareModal, setShowShareModal] = useState(false);

//   const handleLike = () => {
//     setIsLiked(!isLiked);
//     setBlog(prevBlog => ({
//       ...prevBlog,
//       likes: isLiked ? prevBlog.likes - 1 : prevBlog.likes + 1
//     }));
//   };

//   const handleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       const newCommentObj = {
//         id: blog.comments.length + 1,
//         author: 'You',
//         content: newComment,
//         date: new Date().toISOString().split('T')[0],
//       };
//       setBlog(prevBlog => ({
//         ...prevBlog,
//         comments: [...prevBlog.comments, newCommentObj],
//       }));
//       setNewComment('');
//     }
//   };

//   const handleShare = () => {
//     setShowShareModal(true);
//   };

//   const closeShareModal = () => {
//     setShowShareModal(false);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left side - Blog Content */}
//         <div className="lg:w-2/3">
//           <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//           <div className="flex items-center mb-6">
//             <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
//             <div>
//               <p className="font-semibold">{user.name}</p>
//               <p className="text-gray-600 text-sm">{blog.date} · {blog.readTime}</p>
//             </div>
//           </div>
//           <img src={blog.image} alt="Blog cover" className="w-full rounded-lg mb-6" />
//           <p className="text-xl mb-6">{blog.description}</p>
//           <div className="prose max-w-none mb-8">{blog.content}</div>
//           <div className="flex items-center justify-between border-t border-b py-4">
//             <div className="flex items-center space-x-4">
//               <button onClick={handleLike} className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
//                 <Heart className={`w-6 h-6 ${isLiked ? 'fill-current text-red-500' : ''}`} />
//                 <span>{blog.likes}</span>
//               </button>
//               <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
//                 <MessageCircle className="w-6 h-6" />
//                 <span>{blog.comments.length}</span>
//               </button>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button onClick={handleShare} className="text-gray-600 hover:text-green-500">
//                 <Share2 className="w-6 h-6" />
//               </button>
//               <button onClick={handleBookmark} className="text-gray-600 hover:text-yellow-500">
//                 <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current text-yellow-500' : ''}`} />
//               </button>
//             </div>
//           </div>

//           {/* Comments Section */}
//           {showComments && (
//             <div className="mt-8">
//               <h3 className="text-2xl font-bold mb-4">Comments</h3>
//               <div className="space-y-4">
//                 {blog.comments.map((comment) => (
//                   <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="font-semibold">{comment.author}</span>
//                       <span className="text-sm text-gray-500">{comment.date}</span>
//                     </div>
//                     <p>{comment.content}</p>
//                   </div>
//                 ))}
//               </div>
//               <form onSubmit={handleCommentSubmit} className="mt-4">
//                 <textarea
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Write a comment..."
//                   className="w-full p-2 border rounded-lg resize-none"
//                   rows="3"
//                 ></textarea>
//                 <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                   Post Comment
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>

//         {/* Right side - User Profile and Related Blogs */}
//         <div className="lg:w-1/3 space-y-8">
//           {/* User Profile */}
//           <div className="bg-gray-100 rounded-lg p-6">
//             <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
//             <p className="text-gray-600 text-center mb-4">{user.email}</p>
//             <p className="text-gray-800 mb-6">{user.bio}</p>
//             <div className="flex justify-center space-x-4 mb-6">
//               <a href={user.socialLinks.twitter} className="text-blue-400 hover:text-blue-600" aria-label="Twitter">
//                 <Twitter className="w-6 h-6" />
//               </a>
//               <a href={user.socialLinks.linkedin} className="text-blue-700 hover:text-blue-900" aria-label="LinkedIn">
//                 <Linkedin className="w-6 h-6" />
//               </a>
//               <a href={user.socialLinks.github} className="text-gray-800 hover:text-gray-600" aria-label="GitHub">
//                 <GitHub className="w-6 h-6" />
//               </a>
//             </div>
//             <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//               Follow
//             </button>
//           </div>

//           {/* Related Blogs */}
//           <div className="bg-gray-100 rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4">Related Blogs</h3>
//             <div className="space-y-4">
//               {relatedBlogs.map((relatedBlog) => (
//                 <div key={relatedBlog.id} className="flex items-start space-x-4">
//                   <img src={relatedBlog.image} alt={relatedBlog.title} className="w-20 h-20 object-cover rounded" />
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-sm mb-1">{relatedBlog.title}</h4>
//                     <p className="text-gray-600 text-xs mb-1">{relatedBlog.author}</p>
//                     <p className="text-gray-500 text-xs">{relatedBlog.date} · {relatedBlog.readTime}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button className="w-full mt-4 text-blue-500 hover:text-blue-700 flex items-center justify-center">
//               View More
//               <ChevronRight className="w-4 h-4 ml-1" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Share Modal */}
//       {showShareModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Share this article</h3>
//               <button onClick={closeShareModal} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center">
//                 <Twitter className="w-5 h-5 mr-2" />
//                 Share on Twitter
//               </button>
//               <button className="w-full py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 flex items-center justify-center">
//                 <Linkedin className="w-5 h-5 mr-2" />
//                 Share on LinkedIn
//               </button>
//               <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center justify-center">
//                 <Share2 className="w-5 h-5 mr-2" />
//                 Copy Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }