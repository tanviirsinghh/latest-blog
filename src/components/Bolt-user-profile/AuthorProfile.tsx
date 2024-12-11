import  { useEffect, useState } from 'react'
import {
  MapPin,
  Calendar,
  Twitter,
  Github,
  Linkedin,
  BarChart3,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react'
import Loading from '../Loading'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

export interface User {
  id: string
  name: string
  email: string
  profilePicture: string
  blogName: string
  bio: string
  location: string
  coverpicture: string
}

export default function AuthorProfile () {
  const navigate = useNavigate()

  const location = useLocation();
  const id = useParams()
  
  
  const queryParams = new URLSearchParams(location.search);
  const authorId = queryParams.get('authorId');

//   console.log("author id" + authorId)
//   console.log('component te khulda')
  const [authorData, setauthorData] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
   const token = localStorage.getItem('token')
  useEffect(() => {
    // Fetch the author data using the authorId
    setLoading(true)
    async function fetchAuthorData () {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/details/${id.id}`);
          console.log(response.data)
        setauthorData(response.data)
        setLoading(false)
      } catch (err) {
        toast.error('Error / Try Again')
        // console.log('request hi nhi gayi, frontend ton')
        setLoading(false)
      }
    }

    fetchAuthorData()
  }, [authorId])

 
  if (!token) {
    navigate('/signin')
    return
  }
//  this check insure that component only when authorData is not null, otherwise it will not render and give error
  if (loading || !authorData) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  const author = {
    name: 'Sarah Johnson',
    role: 'Senior Software Engineer',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    bio: 'Passionate about web development, cloud architecture, and teaching others. I write about modern development practices and emerging technologies.',
    location: 'San Francisco, CA',
    joinedDate: 'January 2022',
    social: {
      twitter: '@sarahtechblog',
      github: 'sarahj',
      linkedin: 'sarahjohnson'
    },
    stats: {
      posts: 47,
      followers: '12.5K',
      views: '238K',
      engagement: '18%'
    }
  }

  const posts = [
    {
      title: "Understanding React 18's Concurrent Features",
      excerpt:
        'An in-depth look at the new concurrent features in React 18 and how they improve application performance.',
      coverImage:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
      date: '2 days ago',
      readTime: '5 min',
      tags: ['React', 'JavaScript', 'Web Development'],
      stats: {
        views: '1.2K',
        likes: 234,
        comments: 45
      }
    },
    {
      title: 'Building Scalable Applications with Next.js',
      excerpt:
        'Learn how to leverage Next.js features to build performant and scalable web applications.',
      coverImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
      date: '5 days ago',
      readTime: '8 min',
      tags: ['Next.js', 'Performance', 'Architecture'],
      stats: {
        views: '2.5K',
        likes: 456,
        comments: 78
      }
    }
  ]

  return (<>
  dsh</>
   
    // <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
    //   Author Header
    //   <div className='relative'>
    //     <div className='h-80 relative'>
    //       <img
    //         src={authorData.coverpicture}
    //         alt='Cover'
    //         className='w-full h-full object-cover'
    //       />
    //       <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90' />
    //     </div>

    //     <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
    //       <div className='flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 relative'>
    //         <img
    //           src={authorData.profilePicture}
    //           alt={authorData.name}
    //           className='w-32 h-32 rounded-full border-4 border-gray-900 shadow-xl'
    //         />

    //         <div className='flex-1'>
    //           <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
    //             <div>
    //               <h1 className='text-3xl font-bold text-white'>
    //                 {authorData.name}
    //               </h1>
    //               <p className='text-cyan-400 font-medium'>{authorData.blogName}</p>
    //             </div>
    //             <button className='inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-medium rounded-lg transition-colors'>
    //               <Users className='h-5 w-5 mr-2' />
    //               Follow
    //             </button>
    //           </div>

    //           <p className='mt-4 text-gray-300 max-w-2xl'>{authorData.bio}</p>

    //           <div className='mt-4 flex flex-wrap items-center gap-4 text-gray-400'>
    //             <div className='flex items-center gap-1'>
    //               <MapPin size={16} />
    //               <span>{authorData.location}</span>
    //             </div>
    //             <div className='flex items-center gap-1'>
    //               <Calendar size={16} />
    //               <span>Joined {"authorData.joinedDate"}</span>
    //             </div>
    //           </div>

    //           {/* <div className='mt-4 flex gap-4'>
    //             <a
    //               href={`https://twitter.com/${authorData.social.twitter}`}
    //               className='text-gray-400 hover:text-cyan-400 transition-colors'
    //             >
    //               <Twitter size={20} />
    //             </a>
    //             <a
    //               href={`https://github.com/${authorData.social.github}`}
    //               className='text-gray-400 hover:text-cyan-400 transition-colors'
    //             >
    //               <Github size={20} />
    //             </a>
    //             <a
    //               href={`https://linkedin.com/in/${authorData.social.linkedin}`}
    //               className='text-gray-400 hover:text-cyan-400 transition-colors'
    //             >
    //               <Linkedin size={20} />
    //             </a>
    //           </div> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Main Content */}
    //   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
    //     <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
    //       {/* Left Column - Stats & Info */}
    //       <div className='space-y-6'>
    //         {/* Stats Grid */}
    //         <div className='grid grid-cols-2 gap-4'>
    //           <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
    //             <div className='flex items-center gap-3'>
    //               <div className='p-2 rounded-lg text-cyan-400 bg-cyan-400/10'>
    //                 <TrendingUp className='h-6 w-6' />
    //               </div>
    //               <div>
    //                 <p className='text-sm text-gray-400'>Total Posts</p>
    //                 <p className='text-2xl font-bold text-white'>
    //                   {author.stats.posts}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
    //             <div className='flex items-center gap-3'>
    //               <div className='p-2 rounded-lg text-purple-400 bg-purple-400/10'>
    //                 <Users className='h-6 w-6' />
    //               </div>
    //               <div>
    //                 <p className='text-sm text-gray-400'>Followers</p>
    //                 <p className='text-2xl font-bold text-white'>
    //                   {author.stats.followers}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
    //             <div className='flex items-center gap-3'>
    //               <div className='p-2 rounded-lg text-pink-400 bg-pink-400/10'>
    //                 <BarChart3 className='h-6 w-6' />
    //               </div>
    //               <div>
    //                 <p className='text-sm text-gray-400'>Total Views</p>
    //                 <p className='text-2xl font-bold text-white'>
    //                   {author.stats.views}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
    //             <div className='flex items-center gap-3'>
    //               <div className='p-2 rounded-lg text-amber-400 bg-amber-400/10'>
    //                 <MessageCircle className='h-6 w-6' />
    //               </div>
    //               <div>
    //                 <p className='text-sm text-gray-400'>Engagement</p>
    //                 <p className='text-2xl font-bold text-white'>
    //                   {author.stats.engagement}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right Column - Blog Posts */}
    //       <div className='lg:col-span-2 space-y-6'>
    //         <div className='flex items-center justify-between'>
    //           <h2 className='text-xl font-semibold text-white'>Latest Posts</h2>
    //           <div className='flex gap-2'>
    //             <button className='px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors'>
    //               Most Recent
    //             </button>
    //             <button className='px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors'>
    //               Most Popular
    //             </button>
    //           </div>
    //         </div>

    //         <div className='space-y-6'>
    //           {posts.map((post, index) => (
    //             <div key={index} className='group'>
    //               <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-colors'>
    //                 <img
    //                   src={post.coverImage}
    //                   alt={post.title}
    //                   className='w-full h-64 object-cover'
    //                 />
    //                 <div className='p-6'>
    //                   <h3 className='text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors'>
    //                     {post.title}
    //                   </h3>
    //                   <p className='mt-2 text-gray-400'>{post.excerpt}</p>

    //                   <div className='flex flex-wrap gap-2 mt-4'>
    //                     {post.tags.map((tag, tagIndex) => (
    //                       <span
    //                         key={tagIndex}
    //                         className='px-3 py-1 text-sm bg-gray-700/50 text-cyan-400 rounded-full'
    //                       >
    //                         {tag}
    //                       </span>
    //                     ))}
    //                   </div>

    //                   <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50'>
    //                     <div className='flex items-center gap-4 text-sm text-gray-400'>
    //                       <span>{post.date}</span>
    //                       <span>•</span>
    //                       <span>{post.readTime} read</span>
    //                       <span>•</span>
    //                       <span>{post.stats.views} views</span>
    //                     </div>

    //                     <div className='flex items-center gap-4'>
    //                       <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
    //                         <Heart className='h-5 w-5' />
    //                       </button>
    //                       <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
    //                         <MessageCircle className='h-5 w-5' />
    //                       </button>
    //                       <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
    //                         <Bookmark className='h-5 w-5' />
    //                       </button>
    //                       <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
    //                         <Share2 className='h-5 w-5' />
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
// </Link>
  )
}
