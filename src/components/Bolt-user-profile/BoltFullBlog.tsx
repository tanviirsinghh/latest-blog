import {
    Heart,
    Share2,
    Bookmark,
    MoreVertical,
    // Send,
    Clock,
    // MessageSquare,
    Twitter,
    Facebook,
    Instagram,
    Mail,
    Globe,
    Linkedin,
  } from "lucide-react";
  import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Blog } from "../../hooks/index";
import DOMPurify from "dompurify";
import BoltFooter from "./BoltFooter";

  export default function BoltFullBlog({ blog }: { blog: Blog }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(342);
    const [saved, setSaved] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [comments, setComments] = useState([
      {
        id: 1,
        author: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        date: "2 days ago",
        content:
          "This is such an insightful article! I especially loved the part about sustainable practices in modern architecture.",
        likes: 24,
      },
      {
        id: 2,
        author: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "1 day ago",
        content:
          "Great points about urban development. I'd love to see more examples of successful implementations in different cities.",
        likes: 15,
      },
    ]);
    const [newComment, setNewComment] = useState("");
    const [email, setEmail] = useState("");
    const handleLike = () => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };
  
    const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newComment.trim()) return;
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        date: "Just now",
        content: newComment,
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    };














    const navigate = useNavigate()
    // fetch the save blog condition to render  on the save button
    const { id } = useParams()
    console.log('jehda open heoya blog ohdi id ' + id)
  
    useEffect(() => {
      // Persistent bookmark status check across page refreshes
      const fetchBookmarkStatus = async () => {
        const token = localStorage.getItem('token')
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


    const [isLiked, setIsLiked] = useState(false)
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
      const token = localStorage.getItem('token')
  
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <main className="lg:col-span-2">
              {/* Header Section */}
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  {blog.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>8 min read</span>
                  </div>
                  <span>date here</span>
                </div>
              </header>
  
              {/* Featured Image */}
              <img
                src={blog.url}
                alt={blog.author.name}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />
  
              {/* Article Content */}
              <article className="prose lg:prose-xl max-w-none mb-8">
                <p className="mb-4"
                dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(blog.content)
                              }}>
                 
                </p>
  
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
              <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-2 group"
                  >
                     <Heart
                    className={`w-6 h-6 ${
                      isLiked ? 'fill-current text-red-500' : ''
                    }`}
                  />
                    <span className="text-gray-600">{likeCount}</span>
                  </button>
  
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center space-x-2 group"
                    >
                      <Share2 className="w-6 h-6 text-gray-600 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-600">Share</span>
                    </button>
  
                    {showShareMenu && (
                      <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 w-48">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Twitter
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Facebook
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          LinkedIn
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>
  
                <button
                  onClick={handleBookmark}
                  className="flex items-center space-x-2 group"
                >
                  <Bookmark
                    className={`w-6 h-6 ${saved ? "fill-blue-500 text-blue-500" : "text-gray-600"} group-hover:scale-110 transition-transform`}
                  />
                  <span className="text-gray-600">
                    {saved ? "Saved" : "Save"}
                  </span>
                </button>
              </div>
  
              {/* Comments Section */}
              <section className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Comments</h3>
  
                <form onSubmit={handleComment} className="mb-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        rows={3}
                      />
                      <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
  
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <img
                        src={comment.avatar}
                        alt={`${comment.author}'s avatar`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{comment.author}</h4>
                              <p className="text-gray-600 text-sm">
                                {comment.date}
                              </p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <button className="hover:text-blue-500">Reply</button>
                          <button className="hover:text-blue-500">Like</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
  
            {/* Author Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                  <img
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Emma Roberts"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-xl font-bold">Emma Roberts</h2>
                  <p className="text-gray-600">Architecture & Design Editor</p>
                </div>
  
                <div className="mb-6">
                  <p className="text-gray-700">
                    Award-winning architecture journalist with 10+ years of
                    experience covering sustainable design and urban development.
                    Previously wrote for Architectural Digest and Dwell Magazine.
                  </p>
                </div>
  
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold mb-3">Connect with Emma</h3>
                  <div className="flex justify-center space-x-4">
                    <a className="text-gray-600 hover:text-blue-500">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a className="text-gray-600 hover:text-blue-500">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a className="text-gray-600 hover:text-blue-500">
                      <Globe className="w-5 h-5" />
                    </a>
                    <a className="text-gray-600 hover:text-blue-500">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
  
          {/* Footer */}
         <BoltFooter/>
        </div>
      </div>
    );
  }
 
  