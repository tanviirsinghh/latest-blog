import { useEffect, useState } from 'react'
import {
  MapPin,
  Calendar,
  // Twitter,
  // Github,
  // Linkedin,
  BarChart3,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  Bookmark,
  Share2,
  // Heart,
  // Share2,
  // Bookmark
} from 'lucide-react'
import Loading from '../Loading'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { useBlogsPersonal } from '../../hooks/index';
import DOMPurify from 'dompurify';

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
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const authorId = queryParams.get('authorId') || undefined
  const {blogsPersonal} = useBlogsPersonal(authorId)

  console.log('author id, authorProfile component ' + authorId)
  //   console.log('component te khulda')
  const [authorData, setauthorData] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')
  useEffect(() => {
    setLoading(true)
    async function fetchAuthorData () {
      if (!token) {
        toast.error('User not authenticated')
        navigate('/signin')
        return
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { authorId }
        })

        if (response.data.isCurrentUser) {
          navigate('/userprofile')
          return // Avoid unnecessary state updates
        }

        setauthorData(response.data.userData)
      } catch (err) {
        console.error('Error fetching author data:', err)
        toast.error('Error / Try Again')
      } finally {
        setLoading(false) // Ensure loading state is updated
      }
    }

    fetchAuthorData()
  }, [authorId, navigate, token])

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
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        Author Header
        <div className='relative'>
          <div className='h-80 relative'>
            <img
              src={authorData.coverpicture}
              alt='Cover'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90' />
          </div>

          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 relative'>
              <img
                src={authorData.profilePicture}
                alt={authorData.name}
                className='w-32 h-32 rounded-full border-4 border-gray-900 shadow-xl'
              />

              <div className='flex-1'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div>
                    <h1 className='text-3xl font-bold text-white'>
                      {authorData.name}
                    </h1>
                    <p className='text-cyan-400 font-medium'>
                      {authorData.blogName}
                    </p>
                  </div>
                  <button className='inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-medium rounded-lg transition-colors'>
                    <Users className='h-5 w-5 mr-2' />
                    Follow
                  </button>
                </div>

                <p className='mt-4 text-gray-300 max-w-2xl'>{authorData.bio}</p>

                <div className='mt-4 flex flex-wrap items-center gap-4 text-gray-400'>
                  <div className='flex items-center gap-1'>
                    <MapPin size={16} />
                    <span>{authorData.location}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Calendar size={16} />
                    <span>Joined {'authorData.joinedDate'}</span>
                  </div>
                </div>

                {/* <div className='mt-4 flex gap-4'>
                <a
                  href={`https://twitter.com/${authorData.social.twitter}`}
                  className='text-gray-400 hover:text-cyan-400 transition-colors'
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`https://github.com/${authorData.social.github}`}
                  className='text-gray-400 hover:text-cyan-400 transition-colors'
                >
                  <Github size={20} />
                </a>
                <a
                  href={`https://linkedin.com/in/${authorData.social.linkedin}`}
                  className='text-gray-400 hover:text-cyan-400 transition-colors'
                >
                  <Linkedin size={20} />
                </a>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Stats & Info */}
            <div className='space-y-6'>
              {/* Stats Grid */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg text-cyan-400 bg-cyan-400/10'>
                      <TrendingUp className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Total Posts</p>
                      <p className='text-2xl font-bold text-white'>
                        {"austs"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg text-purple-400 bg-purple-400/10'>
                      <Users className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Followers</p>
                      <p className='text-2xl font-bold text-white'>
                        {"auttat"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg text-pink-400 bg-pink-400/10'>
                      <BarChart3 className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Total Views</p>
                      <p className='text-2xl font-bold text-white'>
                        {"auews"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg text-amber-400 bg-amber-400/10'>
                      <MessageCircle className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Engagement</p>
                      <p className='text-2xl font-bold text-white'>
                        {"at"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Blog Posts */}
            <div className='lg:col-span-2 space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold text-white'>
                  Latest Posts
                </h2>
                <div className='flex gap-2'>
                  <button className='px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors'>
                    Most Recent
                  </button>
                  <button className='px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors'>
                    Most Popular
                  </button>
                </div>
              </div>

              <div className='space-y-6'>
              {blogsPersonal.map((post) => (
                  <div key={post.id} className='group'>
                    <div className='bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-colors'>
                      <img
                        src={post.url}
                        alt={post.title}
                        className='w-full h-64 object-cover'
                      />
                      <div className='p-6'>
                        <h3 className='text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors'>
                          {post.title}
                        </h3>
                        <p className='mt-2 text-gray-400'
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.content ? post.content.slice(1, 80) + "..." : " ")
                        }}></p>

                        <div className='flex flex-wrap gap-2 mt-4'>
                          {/* {post.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className='px-3 py-1 text-sm bg-gray-700/50 text-cyan-400 rounded-full'
                            >
                              {tag}
                            </span>
                          ))} */}
                        </div>

                        <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50'>
                          <div className='flex items-center gap-4 text-sm text-gray-400'>
                            <span>{"post.date"}</span>
                            <span>•</span>
                            <span>{"post.readTime"} read</span>
                            <span>•</span>
                            <span>{"post.stats.views"} views</span>
                          </div>

                          <div className='flex items-center gap-4'>
                            <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
                              <Heart className='h-5 w-5' />
                            </button>
                            <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
                              <MessageCircle className='h-5 w-5' />
                            </button>
                            <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
                              <Bookmark className='h-5 w-5' />
                            </button>
                            <button className='text-gray-400 hover:text-cyan-400 transition-colors'>
                              <Share2 className='h-5 w-5' />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
