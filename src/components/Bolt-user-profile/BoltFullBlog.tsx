import {
  Heart,
  Share2,
  Bookmark,
  MoreVertical,
  // Send,
  Clock,
  // MessageSquare,
  Twitter,
  // Facebook,
  // Instagram,
  Mail,
  Globe,
  Linkedin
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { Blog, useUserDetails } from '../../hooks/index'
import DOMPurify from 'dompurify'
import BoltFooter from './BoltFooter'
import Navbar from './Navbar'

export default function BoltFullBlog ({ blog }: { blog: Blog }) {
  // const [liked, setLiked] = useState(false);
  // const [isLiked, setIsLiked] = useState(false)
  const [likeStatus, setLikeStatus] = useState(false)

  const [likeCount, setLikeCount] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const { id } = useParams()
  const [newComment, setNewComment] = useState('')
  const { userDetails } = useUserDetails()
  const token = localStorage.getItem('token')

  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      date: '2 days ago',
      content:
        'This is such an insightful article! I especially loved the part about sustainable practices in modern architecture.',
      likes: 24
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '1 day ago',
      content:
        "Great points about urban development. I'd love to see more examples of successful implementations in different cities.",
      likes: 15
    }
  ])
  
  useEffect(() => {
    const fetchLikeCount = async () => {
      setIsLoading(true)
      try {
       
       const response =   await axios.get(
          `${BACKEND_URL}/api/v1/blog/${blog.id}/postlikes`,
          { headers: { Authorization: token } }
        )


        if (response && response.data) {
          // Toggle like state and adjust like count
            setLikeCount(response.data.count)
            console.log("like count" + response.data)
        }
      } catch (e) {
        console.error('Error:', e)

        // Handle specific error scenarios
        if (axios.isAxiosError(e) && e.response?.status === 411) {
          setLikeStatus(false)
          toast.error('Error while fetching Like')
        }
      } 
    }
  // Fetch status on component mount or blog.id change
    }, [blog.id]);


  useEffect(() => {
    const fetchLikeStatus = async () => {
      setIsLoading(true)
      try {
       
       const response =   await axios.get(
          `${BACKEND_URL}/api/v1/blog/likestatus/${blog.id}`,
          { headers: { Authorization: token } }
        )


        if (response && response.data) {
          // Toggle like state and adjust like count
  
          setLikeCount(count => count + 1)
          setLikeStatus(true)
        }
      } catch (e) {
        console.error('Error:', e)

        // Handle specific error scenarios
        if (axios.isAxiosError(e) && e.response?.status === 411) {
          setLikeStatus(false)
          toast.error('Error while fetching Like')
        }
      } finally {
        setIsLoading(false)
      }
    }
  // Fetch status on component mount or blog.id change
    }, [blog.id]);


  
 



  const handleLike = async () => {
    console.log('like state ' + likeStatus)

    if (!likeStatus) {
    setIsLoading(true)

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/like`,
         null,// No need to send postId explicitly, it's in the URL
        { headers: { Authorization: token } }
      )

      if (response && response.data) {
        // Toggle like state and adjust like count
        const likehai = response.data.isLiked

        setLikeCount(count => count + 1)
        setLikeStatus(likehai)
      }
    } catch (e) {
      console.error('Error:', e)

      // Handle specific error scenarios
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        setLikeStatus(false)
        console.log('haiga pehla hi like, status true krta')
        // setLikeCount(
        //   (count) => count + 1)

        toast.error('Already liked')
      } else if (axios.isAxiosError(e) && e.response?.status === 411) {
        toast.error('Server error, Unable to fetch like')
      } else {
        // Default error handling
        setLikeStatus(false)
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

else {

      try {
        console.log('like remove triggered frontend')
        const response = await axios.delete(
          `${BACKEND_URL}/api/v1/blog/${blog.id}/likeremove`,
           // No need to send postId explicitly, it's in the URL
          { headers: { Authorization: token } }
        )

        if (response && response.data) {
          // Toggle like state and adjust like count
          const removed = response.data.isLiked

          setLikeStatus(removed)
          setLikeCount(count => count - 1)
        }
      } catch (e) {
        console.error('Error:', e)

        // Handle specific error scenarios
        if (axios.isAxiosError(e) && e.response?.status === 403) {
          setLikeStatus(true)
          toast.error('Error while removing Like')
        } else {
          // Default error handling
          setLikeStatus(true)
          toast.error('Server error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    } 
     
  }


  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.trim()) return
    const comment = {
      id: comments.length + 1,
      author: 'Current User',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      date: 'Just now',
      content: newComment,
      likes: 0
    }
    setComments([comment, ...comments])
    setNewComment('')
  }

  const navigate = useNavigate()
  // fetch the save blog condition to render  on the save button

  useEffect(() => {
    // Persistent bookmark status check across page refreshes
    const fetchBookmarkStatus = async () => {
      if (!token) return

      setIsLoading(true)
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/bookmarkstatus/${blog.id}`,

          { headers: { Authorization: token } }
        )

        // More robust status checking
        if (response && response.data) {
          const bookmarkStatus = response.data.isBookmarked
          const savedId = response.data.savedBlogId || null

          setIsBookmarked(!!bookmarkStatus)
          setSavedBlogId(savedId)
        }
      } catch (e: unknown) {
        console.error('Error fetching bookmark status:')
        // Handle specific error scenarios
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          // localStorage.removeItem('token');
          setIsBookmarked(false)
        } else if (axios.isAxiosError(e) && e.response?.status === 500) {
          toast.error('Error while fetching blog post / Try Again')
        } else {
          // Default to unbookmarked state on other errors
          setIsBookmarked(false)
          setSavedBlogId(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookmarkStatus()
  }, [blog.id])

  const [isBookmarked, setIsBookmarked] = useState(false)
  // const [showComments, setShowComments] = useState(false)
  // const [newComment, setNewComment] = useState('')

  const [savedBlogId, setSavedBlogId] = useState(null)
  //   onst [isBookmarked, setIsBookmarked] = useState(false);
  // const [savedBlogId, setSavedBlogId] = useState(null);
  const [isLoading, setIsLoading] = useState(false) // store the blogId here when stored in the database
  // const [showShareModal, setShowShareModal] = useState(false);

  if (!localStorage.getItem('token')) {
    navigate('/signin')
    return
  }
  // const handleLike = () => {
  //   setIsLiked(!isLiked)
  //   settempBlog(prevtempBlog => ({
  //     ...prevtempBlog,
  //     likes: isLiked ? prevtempBlog.likes - 1 : prevtempBlog.likes + 1
  //   }))
  // }

  const handleBookmark = async () => {
    // Retrieve the authentication token from local storage

    // Check if user is authenticated
    if (!token) {
      toast.error('Please sign in')
      return
    }

    // Prevent multiple simultaneous bookmark actions
    if (isLoading) return

    setIsLoading(true)

    try {
      if (!isBookmarked) {
        // Saving blog
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog/saveblog`,
          { postId: blog.id },
          { headers: { Authorization: token } }
        )

        // Ensure response and data exist before setting
        if (response && response.data && response.data.id) {
          setSavedBlogId(response.data.id)
          setIsBookmarked(true)
          toast.success('Blog Saved')
        } else {
          throw new Error('Invalid server response')
        }
      } else {
        // Removing saved blog
        // Use savedBlogId if available, otherwise use blog.id as fallback
        const blogToRemove = blog.id

        await axios.delete(
          `${BACKEND_URL}/api/v1/blog/removesavedblog/${blogToRemove}`,
          { headers: { Authorization: token } }
        )

        setIsBookmarked(false)
        setSavedBlogId(null)
        toast.success('Blog Removed')
      }
    } catch (e: unknown) {
      console.log('Bookmark error:')

      if (axios.isAxiosError(e) && e.response?.status === 404) {
        toast.error('Blog not found')
      } else if (axios.isAxiosError(e) && e.response?.status === 411) {
        toast.error('No response from server. Check your internet connection.')

        toast.error('Failed to update bookmark')
      }
    } finally {
      // Always reset loading state
      setIsLoading(false)
    }
  }

  // const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (newComment.trim()) {
  //     const newCommentObj = {
  //       id: tempBlog.comments.length + 1,
  //       author: 'You',
  //       content: newComment,
  //       date: new Date().toISOString().split('T')[0]
  //     }
  //     settempBlog(prevtempBlog => ({
  //       ...prevtempBlog,
  //       comments: [...prevtempBlog.comments, newCommentObj]
  //     }))
  //     setNewComment('')
  //   }
  // }

  // const handleShare = () => {
  //   setShowShareModal(true);
  // };

  // const closeShareModal = () => {
  //   setShowShareModal(false);
  // };
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=' bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <Navbar />

      <div className=' pt-16 '>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <main className='lg:col-span-2'>
              {/* Header Section */}
              <header className='mb-8'>
                <h1 className=' text-gray-300 text-4xl font-bold mb-4'>
                  {blog.title}
                </h1>
                <div className='flex items-center space-x-4 text-gray-400 text-sm'>
                  <div className='flex items-center'>
                    <Clock className='w-4 h-4 mr-1' />
                    <span>8 min read</span>
                  </div>
                  <span>date here</span>
                </div>
              </header>

              {/* Featured Image */}
              <img
                src={blog.url}
                alt={blog.author.name}
                className='w-full h-[400px] object-cover rounded-lg mb-8'
              />

              {/* Article Content */}
              <article className='text-gray-300 prose lg:prose-xl max-w-none mb-8'>
                <p
                  className='mb-4'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.content)
                  }}
                ></p>

                {/* <p className="mb-4">
                  From living walls that purify air to solar-integrated facades
                  that generate power, the innovations in sustainable architecture
                  are transforming our cities into living, breathing ecosystems.
                  These advancements are not just about environmental
                  responsibility—they're about creating spaces that enhance human
                  wellbeing and foster community connection.
                </p>
  
                <p className="mb-4">
                  Recent developments in materials science have introduced new
                  possibilities for sustainable construction. Self-healing
                  concrete, transparent solar panels, and biodegradable building
                  materials are just a few examples of how technology is
                  revolutionizing the industry.
                </p> */}
              </article>

              {/* Interaction Buttons */}
              <div className='flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8'>
                <div className='flex items-center space-x-6'>
                  <button
                    onClick={handleLike}
                    className=' flex items-center space-x-2 group'
                  >
                    <Heart
                      className={`w-6 h-6 text-red-600 ${
                        likeStatus ? 'fill-current text-red-900' : ''
                      }`}
                    />
                    <span className='text-gray-300 font-sans'>{likeCount}</span>
                  </button>

                  <div className='relative'>
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className='flex items-center space-x-2 group'
                    >
                      <Share2 className='w-6 h-6 text-blue-300 group-hover:scale-110 transition-transform' />
                      <span className='text-gray-300'>Share</span>
                    </button>

                    {showShareMenu && (
                      <div className='absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 w-48'>
                        <button className='w-full text-left px-4 py-2 hover:bg-gray-100'>
                          Twitter
                        </button>
                        <button className='w-full text-left px-4 py-2 hover:bg-gray-100'>
                          Facebook
                        </button>
                        <button className='w-full text-left px-4 py-2 hover:bg-gray-100'>
                          LinkedIn
                        </button>
                        <button className='w-full text-left px-4 py-2 hover:bg-gray-100'>
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleBookmark}
                  className='flex items-center space-x-2 group'
                >
                  <Bookmark
                    className={`w-6 h-6 ${
                      isBookmarked
                        ? 'fill-blue-500 text-blue-500'
                        : 'text-gray-600'
                    } group-hover:scale-110 transition-transform`}
                  />
                  {/* <span className="text-gray-600">
                    {saved ? "Saved" : "Save"}
                  </span> */}
                </button>
              </div>

              {/* Comments Section */}
              <section className='mt-12'>
                <h3 className='text-2xl text-gray-300 font-bold mb-6'>
                  Comments
                </h3>

                <form onSubmit={handleComment} className='mb-8'>
                  <div className='flex items-start space-x-4'>
                    <img
                      src={userDetails?.profilePicture}
                      alt='Your avatar'
                      className='w-10 h-10 rounded-full'
                    />
                    <div className='flex-1'>
                      <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder='Add a comment...'
                        className='w-full p-3 border text-white bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                        rows={3}
                      />
                      <button
                        type='submit'
                        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>

                <div className='space-y-6'>
                  {comments.map(comment => (
                    <div key={comment.id} className='flex space-x-4'>
                      <img
                        src={comment.avatar}
                        alt={`${comment.author}'s avatar`}
                        className='w-10 h-10 rounded-full'
                      />
                      <div className='flex-1'>
                        <div className='text-white bg-gray-800 shadow-md p-4 rounded-lg'>
                          <div className='flex items-center justify-between mb-2'>
                            <div>
                              <h4 className='font-semibold'>
                                {comment.author}
                              </h4>
                              <p className='text-white text-sm'>
                                {comment.date}
                              </p>
                            </div>
                            <button className='text-gray-400 hover:text-gray-600'>
                              <MoreVertical className='w-4 h-4' />
                            </button>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                        {/* <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <button className="hover:text-blue-500">Reply</button>
                          <button className="hover:text-blue-500">Like</button>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* Author Sidebar */}
            <aside className='lg:col-span-1'>
              <div className='sticky top-44 bg-gray-900 rounded-lg shadow-lg p-6'>
                <div className='text-center mb-6'>
                  <img
                    src='https://randomuser.me/api/portraits/women/45.jpg'
                    alt='Emma Roberts'
                    className='w-24 h-24 rounded-full mx-auto mb-4'
                  />
                  <h2 className='text-xl text-gray-300 font-bold'>
                    Emma Roberts
                  </h2>
                  <p className='text-gray-300'>Architecture & Design Editor</p>
                </div>

                <div className='mb-6'>
                  <p className='text-gray-300'>
                    Award-winning architecture journalist with 10+ years of
                    experience covering sustainable design and urban
                    development. Previously wrote for Architectural Digest and
                    Dwell Magazine.
                  </p>
                </div>

                <div className='border-t border-gray-200 pt-4'>
                  <h3 className='font-semibold mb-3 text-gray-300'>
                    Connect with Emma
                  </h3>
                  <div className='flex justify-center space-x-4'>
                    <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                      <Twitter className='w-5 h-5' />
                    </a>
                    <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                      <Linkedin className='w-5 h-5' />
                    </a>
                    <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                      <Globe className='w-5 h-5' />
                    </a>
                    <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                      <Mail className='w-5 h-5' />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Footer */}
          <BoltFooter />
        </div>
      </div>
    </div>
  )
}
