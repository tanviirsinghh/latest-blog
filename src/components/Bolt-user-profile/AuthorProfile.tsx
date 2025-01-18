import { useEffect, useState } from 'react'
import { MapPin, Calendar, BarChart3, TrendingUp, Users } from 'lucide-react'
import Loading from '../Loading'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useBlogsPersonal } from '../../hooks/index'
import Footer from '../Footer'
import AuthorPosts from './AuthorPosts'
                                          //using
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
  const { blogsPersonal } = useBlogsPersonal(authorId)

  const [authorData, setauthorData] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')
  const [stat, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0
  })
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

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/user-stats`,
          {
            headers: {
              Authorization: `${token}`
            }
          }
        )
        // const data = await response.json();
        setStats(response.data)
        console.log(
          '...................................user stats',
          response.data
        )
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (!token) {
    navigate('/signin')
    return
  }
  console.log(
    'detail route, author data, autor di profile te click kita',
    authorData
  )
  //  this check insure that component only when authorData is not null,
  //  otherwise it will not render and give error
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
      <div className='min-h-screen bg-black'>
        {authorData.name}
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
            <div className=' flex flex-col md:flex-row items-start  md:items-end gap-6 -mt-20 relative'>
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
                <div className='bg-black backdrop-blur-lg rounded-xl p-6 border border-gray-300/50'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg text-cyan-400 bg-cyan-400/10'>
                      <TrendingUp className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Total Posts</p>
                      <p className='text-2xl font-bold text-white'>
                        {stat.totalPosts}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-black backdrop-blur-lg rounded-xl p-6 border border-gray-300/50'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg text-purple-400 bg-purple-400/10'>
                      <Users className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Total Likes</p>
                      <p className='text-2xl font-bold text-white'>
                        {stat.totalLikes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-black backdrop-blur-lg rounded-xl p-6 border border-gray-300/50'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg text-pink-400 bg-pink-400/10'>
                      <BarChart3 className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Total Comments</p>
                      <p className='text-2xl font-bold text-white'>
                        {stat.totalComments}
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
              </div>

              <div className='space-y-6'>
                {blogsPersonal.map(blog => (
                  <AuthorPosts
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || 'Anonymous'}
                    title={blog.title}
                    content={blog.content}
                    publishDate=' save the date also and then fetch here'
                    url={blog.url}
                    // make user upload the photo then fetch here
                    like={blog._count.like}
                    comment={blog._count.comment}
                    save={blog._count.savedPosts}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-black h-24'></div>
      <Footer />
    </>
  )
}
