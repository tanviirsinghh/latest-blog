
import  { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle,  Bookmark, } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {Blog} from '../hooks/index';
import UserInfoSide from '../components/UserInfoSide';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
// import Loading from '@/components/Loading';


export default function NewFullBlog({ blog }: { blog: Blog }) {
  const navigate = useNavigate()
  // fetch the save blog condition to render  on the save button

  const {id} = useParams()
  console.log("jehda open heoya blog ohdi id "+ id)




  useEffect(() => {
    // Persistent bookmark status check across page refreshes
    const fetchBookmarkStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      setIsLoading(true);
      
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/bookmarkstatus/${blog.id}`,
          
          { headers: { Authorization: token } }
        );
        
        // More robust status checking
        if (response && response.data) {
          const bookmarkStatus = response.data.isBookmarked;
          const savedId = response.data.savedBlogId || null;
          
          setIsBookmarked(!!bookmarkStatus);
          setSavedBlogId(savedId);
        }
      } catch (e : unknown) {
        console.error('Error fetching bookmark status:');
        // Handle specific error scenarios
        if(axios.isAxiosError(e) && e.response?.status === 404){
          // localStorage.removeItem('token');
          setIsBookmarked(false);

       } else if(axios.isAxiosError(e) && e.response?.status === 500){
        // localStorage.removeItem('token');
        toast.error('Error while fetching blog post / Try Again');
     } 
        else {
          // Default to unbookmarked state on other errors
          setIsBookmarked(false);
          setSavedBlogId(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookmarkStatus();
 }, [blog.id]); // Ensures check happens on blog change
 
 // Optional: Add a loading state to UI









  // useEffect(() => {
  //   setIsBookmarked(false); // Reset before fetching
  //   async function fetchBookmarkState() {
  //     const token = localStorage.getItem('token');
  //     try {
  //       const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bookmarkstatus/${id}`, {
  //         headers: { Authorization: token },
  //       });
  //       setIsBookmarked(response.data.isBookmarked || false);
  //     } catch (error) {
  //       console.error('Error fetching bookmark status:', error);
  //     }
  //   }
  //   fetchBookmarkState();
  // }, [id]);
  

  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate writer and tech enthusiast. I love exploring new technologies and sharing my insights with the world.',
    avatar: '/placeholder.svg?height=150&width=150',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  });
  
  const [tempBlog, settempBlog] = useState({
    title: 'The Future of Artificial Intelligence in Web Development',
    description: 'Explore how AI is revolutionizing the way we build and interact with websites, and what this means for developers and users alike.',
    content: `Artificial Intelligence is rapidly transforming various industries, and web development is no exception. In this post, we'll dive deep into how AI is changing the landscape of web development, discussing topics such as:

1. AI-powered design tools
2. Intelligent chatbots and virtual assistants
3. Personalized user experiences
4. Automated testing and bug detection
5. The ethical considerations of AI in web development

Join me on this exciting journey as we explore the cutting-edge advancements in AI and their impact on the future of web development.`,
    image: '/placeholder.svg?height=400&width=800',
    date: '2023-05-15',
    readTime: '5 min read',
    likes: 42,
    comments: [
      { id: 1, author: 'Alice', content: 'Great article! Very insightful.', date: '2023-05-16' },
      { id: 2, author: 'Bob', content: 'I\'m excited to see how AI will shape the future of web development.', date: '2023-05-17' },
    ],
  });

  const [relatedtempBlogs, setRelatedtempBlogs] = useState([
    {   
      id: 1,
      title: 'Machine Learning in Frontend Development',
      author: 'Jane Smith',
      date: '2023-05-10',
      readTime: '4 min read',
      image: '/placeholder.svg?height=80&width=120',
    },
    {
      id: 2,
      title: 'The Rise of AI-Assisted Coding',
      author: 'Mike Johnson',
      date: '2023-05-12',
      readTime: '6 min read',
      image: '/placeholder.svg?height=80&width=120',
    },
    {
      id: 3,
      title: 'Ethical Considerations in AI Development',
      author: 'Sarah Lee',
      date: '2023-05-14',
      readTime: '5 min read',
      image: '/placeholder.svg?height=80&width=120',
    },
  ]);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  // const prevBookmarkState = useRef(isBookmarked)
  
  const [savedBlogId, setSavedBlogId] = useState(null);
//   onst [isBookmarked, setIsBookmarked] = useState(false);
// const [savedBlogId, setSavedBlogId] = useState(null);
const [isLoading, setIsLoading] = useState(false); // store the blogId here when stored in the database  
  // const [showShareModal, setShowShareModal] = useState(false);

  if(!localStorage.getItem('token')){
    navigate('/signin')
    return 
  }
  const handleLike = () => {
    setIsLiked(!isLiked);
    settempBlog(prevtempBlog => ({
      ...prevtempBlog,
      likes: isLiked ? prevtempBlog.likes - 1 : prevtempBlog.likes + 1
    }));
  };




  const handleBookmark = async () => {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token');
    
    // Check if user is authenticated
    if (!token) {
      toast.error('Please sign in');
      return;
    }
    
    // Prevent multiple simultaneous bookmark actions
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (!isBookmarked) {
        // Saving blog
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog/saveblog`,
          { postId: blog.id },
          { headers: { Authorization: token } }
        );
        
        // Ensure response and data exist before setting
        if (response && response.data && response.data.id) {
          setSavedBlogId(response.data.id);
          setIsBookmarked(true);
          toast.success("Blog Saved");
        } else {
          throw new Error('Invalid server response');
        }
      } else {
        // Removing saved blog
        // Use savedBlogId if available, otherwise use blog.id as fallback
        const blogToRemove = blog.id;
        
        await axios.delete(
          `${BACKEND_URL}/api/v1/blog/removesavedblog/${blogToRemove}`,
          { headers: { Authorization: token } }
        );
        
        setIsBookmarked(false);
        setSavedBlogId(null);
        toast.success("Blog Removed");
      }
    } catch (e: unknown) {
      console.log('Bookmark error:');
  
      if (axios.isAxiosError(e) && e.response?.status === 404) {
          toast.error('Blog not found');
      } else if (axios.isAxiosError(e) && e.response?.status === 411) {
          toast.error('No response from server. Check your internet connection.');
      // } else if (axios.isAxiosError(e) && e.request) {
      //     // The request was made but no response was received
      //     toast.error('No response from server. Check your internet connection.');
      // } else {
          // Something happened in setting up the request
          toast.error('Failed to update bookmark');
      }
  } finally {
      // Always reset loading state
      setIsLoading(false);
  }
 
  }


  
//   const handleBookmark = async () => {
    
//     prevBookmarkState.current = isBookmarked  // true

//      // isBookmarked true


//     const postId = blog.id;

//     const token = localStorage.getItem('token')

   
//     if(!prevBookmarkState.current  ){   // check krda pya ke purani value ki aa - false es da mtlb handleBookmark true layi trigger hoeya 
//        // it means blog got saved
//        try{
//        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/saveblog`,{
//         postId
//       },{
//         headers:{
//           Authorization: token
//         }
//       })
//          toast.success("Blog Saved")
         
//          setSavedBlogId(response.data.id)

//          console.log("Blog saved, Here is the response " +  JSON.stringify(response))
//          setIsBookmarked(!isBookmarked)
//     }
  
//   catch(e){
//     if(isAxiosError(e)){
      
//       toast.error('Internal server error / Try Again')
//       setIsBookmarked(prevBookmarkState.current);
      
//     }
//   }
// }

// if(prevBookmarkState.current){
//   // it means blog got saved
//   try{
//     const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/removesavedblog/${id}`, {
//       headers: {
//         Authorization: token, // Add authorization token if needed
//       },
//     });
//     toast.success("Blog Removed")
//     console.log('Saved Blog Deleted' + response)
   
//     prevBookmarkState.current = isBookmarked
// }

// catch(e){
// if(isAxiosError(411)){
//  toast.error('Internal server error / Try Again')
// }
// }
// }
//   };

  const handleCommentSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: tempBlog.comments.length + 1,
        author: 'You',
        content: newComment,
        date: new Date().toISOString().split('T')[0],
      };
      settempBlog(prevtempBlog => ({
        ...prevtempBlog,
        comments: [...prevtempBlog.comments, newCommentObj],
      }));
      setNewComment('');
    }
  };

  // const handleShare = () => {
  //   setShowShareModal(true);
  // };

  // const closeShareModal = () => {
  //   setShowShareModal(false);
  // };
  if (isLoading) {
    return <Loading/>;
  }
   
  

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
     
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - tempBlog Content */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center mb-6">
            {/* <img src={Blog.url}  className="w-12 h-12 rounded-full mr-4" /> */}
            <div>
              <p className="font-semibold">{blog.author.name}</p>
              {/* <p className="text-gray-600 text-sm">{tempBlog.date} · {tempBlog.readTime}</p> */}
            </div>
          </div>
          <img src={blog.url} alt="conditional render the img" className=" w-full rounded-lg mb-6 h-80 object-fill" />
          {/* <p className="text-xl mb-6">{tempBlog.description}</p> */}
          <div className="prose max-w-none mb-8"  dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content)
              }}></div>
          <div className="flex items-center justify-between border-t border-b py-4">
            <div className="flex items-center space-x-4">
              <button onClick={handleLike} className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                <span>{tempBlog.likes}</span>
              </button>
              <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                <MessageCircle className="w-6 h-6" />
                <span>{tempBlog.comments.length}</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button onClick={handleShare} className="text-gray-600 hover:text-green-500">
                <Share2 className="w-6 h-6" />
              </button> */}
              <button onClick={handleBookmark} className="text-gray-600 hover:text-yellow-500">
                <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current text-yellow-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Comments</h3>
              <div className="space-y-4">
                {tempBlog.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-2 border rounded-lg resize-none"
                //   rows="3"
                ></textarea>
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Post Comment
                </button>
              </form>
            </div>
          )}
        </div>


{/* eh nhi comment out rkna */}
        {/* Right side - User Profile and Related tempBlogs */}
      <UserInfoSide/>
      </div>

      {/* Share Modal */}
      {/* {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Share this article</h3>
              <button onClick={closeShareModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center">
                <Twitter className="w-5 h-5 mr-2" />
                Share on Twitter
              </button>
              <button className="w-full py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 flex items-center justify-center">
                <Linkedin className="w-5 h-5 mr-2" />
                Share on LinkedIn
              </button>
              <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center justify-center">
                <Share2 className="w-5 h-5 mr-2" />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* ethe uper tak */}
    </div>
    </>
  );
  }