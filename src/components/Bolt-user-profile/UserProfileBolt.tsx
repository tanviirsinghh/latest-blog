import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Update: Added navigate for navigation
import { BACKEND_URL } from '../../config'
import {
  Camera,
  X,
  Bookmark,
  BarChart3,
  TrendingUp,
  PencilIcon
} from 'lucide-react'
import {
  useSavedBlogs,
  useUserDetails,
  useBlogsPersonal
} from '../../hooks/index'
                                            //using
                                            
import Loading from '../Loading'
import ImageUploadHook from '../../hooks/ImageUploadHook'
import Navbar from '../Bolt-user-profile/Navbar'
import SavedBlogComponent from './SavedBlogComponent'
import AuthorPosts from './AuthorPosts'

export default function ProfileInfo () {
  const { loading, userDetails, setUserDetails } = useUserDetails()
  const [isSaving, setIsSaving] = useState(false)
  const { savedblogs } = useSavedBlogs()
  const { blogsPersonal } = useBlogsPersonal()
  const [editeduser, setEditeduser] = useState({
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    blogName: userDetails?.blogName || '',
    bio: userDetails?.bio || '',
    location: userDetails?.location || '',
    coverpicture: userDetails?.coverpicture || ''
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState( userDetails?.profilePicture || '' )
  const [coverImagePreview, setcoverImagePreview] = useState(userDetails?.coverpicture || '')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [confirm, setConfirm] = useState(false)
  const [load, setLoad] = useState(false)
  const [coverConfirm, setCoverConfirm] = useState(false)
  const navigate = useNavigate()
  const [isloading, setLoading] = useState(false)
  const [stat, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0
  })

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

  useEffect(() => {
    if (userDetails) {
      setEditeduser({
        name: userDetails.name || '',
        email: userDetails.email || '',
        blogName: userDetails.blogName || '',
        bio: userDetails.bio || '',
        location: userDetails.location || '',
        coverpicture: userDetails.coverpicture || ''
      })
    }
  }, [userDetails])
  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logged out successfully!')
    navigate('/signin') // Update: Use navigate instead of window.location.href
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setEditeduser(prev => ({ ...prev, [name]: value }))
  }
  const handleCancel = () => {
    if (userDetails) {
      setEditeduser(userDetails) // Reset the edited state to the original data from the database.
    }

    setIsEditModalOpen(false)
  }
  const getRefreshData = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sign In first')
      navigate('/signin')
      return
    }
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
        headers: {
          Authorization: ` ${token}` // Ensure token format is correct
        }
      })
      setUserDetails(response.data)
    } catch (error) {
      console.error('Error fetching user details:', error)
      toast.error('Failed to refresh user details.')
    }
  }
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/signin')
    return
  }

  if (loading || !userDetails) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true) // Disable the button

    const token = localStorage.getItem('token')
    try {
      // Simplified input check logic
      const payload: Partial<typeof editeduser> = {}
      if (editeduser.name !== userDetails.name) payload.name = editeduser.name
      if (editeduser.email !== userDetails.email)
        payload.email = editeduser.email
      if (editeduser.blogName !== userDetails.blogName)
        payload.blogName = editeduser.blogName
      if (editeduser.bio !== userDetails.bio) payload.bio = editeduser.bio
      if (editeduser.location !== userDetails.location)
        payload.location = editeduser.location
      if (editeduser.coverpicture !== userDetails.coverpicture)
        payload.coverpicture = editeduser.coverpicture

      console.log(payload)
      console.log('pohonch gya,update send krn api kol')
      if (Object.keys(payload).length > 0) {
        await axios.put(
          `${BACKEND_URL}/api/v1/user/update-user-info`,
          payload,
          {
            headers: { Authorization: token }
          }
        )
        toast.success('Profile updated successfully!')

        await getRefreshData()
        setIsEditModalOpen(false)
      } else {
        toast.info('No changes detected.')
      }
    } catch (err) {
      setIsSaving(false) // Disable the button

      toast.error('Failed to update profile. Please try again.')
    }
  }
  const handleProfileImage = async () => {
    if (!image) {
      toast.error('Please select an image before confirming.')
      return
    }
    const token = localStorage.getItem('token')
    try {
      setLoad(true)
      const imageUrl = await ImageUploadHook(image)
      if (imageUrl) {
        setImagePreview(imageUrl)

        await axios.put(
          `${BACKEND_URL}/api/v1/user/update-profile-picture`,
          { profilePicture: imageUrl },
          { headers: { Authorization: token } }
        )
        await getRefreshData()
        setIsEditModalOpen(false)
        toast.success('Image uploaded successfully!')
      } else {
        toast.error('Image upload failed. Please try again.')
      }
    } catch (err) {
      console.error('Image upload error:', err)
      toast.error('An error occurred during image upload.')
    } finally {
      setLoad(false)
      setConfirm(false)
    }
  }
  //  handle cover image upload
  const handleCoverImage = async () => {
    if (!coverImage) {
      toast.error('Please select an image before confirming.')
      return
    }
    const token = localStorage.getItem('token')
    try {
      setLoad(true)
      const imageUrl = await ImageUploadHook(coverImage)
      if (imageUrl) {
        setcoverImagePreview(imageUrl)
        // Update profile picture in the backend
        await axios.put(
          `${BACKEND_URL}/api/v1/user/update-cover-picture`,
          { coverpicture: imageUrl },
          { headers: { Authorization: token } }
        )
        await getRefreshData()
        setIsEditModalOpen(false)
        toast.success('Image uploaded successfully!')
      } else {
        toast.error('Image upload failed. Please try again.')
      }
    } catch (err) {
      console.error('Image upload error:', err)
      toast.error('An error occurred during image upload.')
    } finally {
      setLoad(false)
      setConfirm(false)
    }
  }

  const stats = [
    {
      label: 'Total Likes',
      value: stat.totalLikes,
      icon: BarChart3,
      change: 'Anaylize stats to get more engagement',
      color: 'text-cyan-400'
    },
    {
      label: 'Blog Posts',
      value: stat.totalPosts,
      icon: TrendingUp,
      change: 'Post More, for more Reach',
      color: 'text-purple-400'
    },
    {
      label: 'Total Comments',
      value: stat.totalComments,
      icon: TrendingUp,
      change: 'Engage with the Comments,  Engagement++',
      color: 'text-pink-400'
    }
  ]

  if (isloading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <>
      <Navbar />
      <div className='h-16 bg-black '></div>
      <div className=' min-h-screen bg-black'>
        {/* Profile Header */}
        <div className='relative'>
          <div className='  h-80  relative'>
            <img
              src={coverImagePreview || userDetails.coverpicture}
              alt='Cover'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90' />
            {/* if coverConfirm is true it means that button is click and show the upload image component */}
            {coverConfirm ? (
              <div className=' absolute top-14 left-[38rem]  bg-gray-800/50 backdrop-blur-lg rounded-xl p-2 border border-gray-700/50 '>
                <div className='grid  grid-cols-1 space-y-2'>
                  <div className='flex  items-center justify-center  mt-3 h-24 w-60'>
                    <label className='flex flex-col rounded-lg border-4 border-dashed h-24  p-2 group text-center'>
                      <div className='h-24 w-full text-center flex flex-col cursor-pointer  justify-center items-center  '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-6 h-6 text-blue-400 group-hover:text-blue-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                          />
                        </svg>
                        <div className='flex flex-auto max-h-48 w-2/5 mx-auto -mt-10'></div>
                        <p className=' text-xs pointer-none text-gray-500 '>
                          <span className='text-sm'>Drag and drop</span> files
                          here <br /> or{' '}
                          <a
                            href=''
                            id=''
                            className='text-blue-600 hover:underline'
                          >
                            select a file
                          </a>{' '}
                          from your computer
                        </p>
                      </div>
                      <input
                        type='file'
                        className='hidden'
                        accept='image/*'
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            setCoverImage(e.target.files[0])
                            setcoverImagePreview(
                              URL.createObjectURL(e.target.files[0])
                            )
                          }
                        }}
                      />{' '}
                    </label>
                  </div>
                </div>
                <p className='text-xs text-gray-300 text-center mt-2'>
                  <span>File type: Types of Images only</span>
                </p>
                <div className='flex justify-evenly items-center'>
                  <button
                    className={`h-8 my-3 w-20 flex justify-center items-center bg-blue-500 text-xs text-gray-100   rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline  shadow-lg cursor-pointer transition ease-in duration-300' ${
                      load
                        ? 'bg-gray-400 cursor-not-allowed pointer-events-none'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    onClick={handleCoverImage}
                    disabled={load}
                  >
                    Confirm
                  </button>
                  <button
                    className='h-8 my-3 w-20 flex justify-center items-center bg-red-500 text-xs text-gray-100     rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-600 shadow-lg cursor-pointer transition ease-in duration-300'
                    onClick={() => {
                      setCoverConfirm(false)
                      setCoverImage(null)
                      setcoverImagePreview(userDetails?.coverpicture || '')
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className='absolute top-4 right-4 flex items-center gap-2 bg-sky-400 text-black px-4 py-2 rounded-lg hover:bg-sky-600 hover:text-white cursor-pointer transition-colors duration-200'
                onClick={() => setCoverConfirm(true)}
              >
                <span className='flex items-center gap-1'>
                  <Camera size={18} />
                  Change Cover
                </span>
              </button>
            )}

            {/* toggle upload component */}
          </div>

          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col   md:flex-row items-start md:items-end gap-6 -mt-20 relative'>
              {/* profile picture update */}
              <div className='relative group'>
                <img // if not found image put a random image,    fix this later
                  src={imagePreview || userDetails.profilePicture}
                  alt={userDetails.name}
                  className='w-36 h-36 rounded-full border-1 border-gray-900 shadow-xl'
                />
                <button
                  className='absolute bottom-3 right-2 bg-sky-500 text-white p-2 rounded-full hover:bg-blue-600'
                  onClick={() => setConfirm(true)}
                >
                  <PencilIcon size={18} />
                </button>
              </div>

              {confirm && (
                <div className=' absolute left-44 bg-gray-800/50 backdrop-blur-lg rounded-xl p-2 border border-gray-700/50 '>
                  <div className='grid grid-cols-1 space-y-2'></div>
                  <div className='grid  grid-cols-1 space-y-2'>
                    <div className='flex  items-center justify-center  mt-3 h-24 w-60'>
                      <label className='flex flex-col rounded-lg border-4 border-dashed h-24  p-2 group text-center'>
                        <div className='h-24 w-full text-center flex flex-col cursor-pointer  justify-center items-center  '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 text-blue-400 group-hover:text-blue-600'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                            />
                          </svg>
                          <div className='flex flex-auto max-h-48 w-2/5 mx-auto -mt-10'></div>
                          <p className=' text-xs pointer-none text-gray-500 '>
                            <span className='text-sm'>Drag and drop</span> files
                            here <br /> or{' '}
                            <a
                              href=''
                              id=''
                              className='text-blue-600 hover:underline'
                            >
                              select a file
                            </a>{' '}
                            from your computer
                          </p>
                        </div>
                        <input
                          type='file'
                          className='hidden'
                          accept='image/*'
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setImage(e.target.files[0])
                              setImagePreview(
                                URL.createObjectURL(e.target.files[0])
                              )
                            }
                          }}
                        />{' '}
                      </label>
                    </div>
                  </div>
                  <p className='text-xs text-gray-300 text-center mt-2'>
                    <span>File type: Types of Images only</span>
                  </p>
                  <div className='flex justify-evenly items-center'>
                    <button
                      className={`h-8 my-3 w-20 flex justify-center items-center bg-blue-500 text-xs text-gray-100   rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline  shadow-lg cursor-pointer transition ease-in duration-300' ${
                        load
                          ? 'bg-gray-400 cursor-not-allowed pointer-events-none'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                      onClick={handleProfileImage}
                      disabled={load}
                    >
                      Confirm
                    </button>
                    <button
                      className='h-8 my-3 w-20 flex justify-center items-center bg-red-500 text-xs text-gray-100     rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-600 shadow-lg cursor-pointer transition ease-in duration-300'
                      onClick={() => {
                        setConfirm(false)
                        setImage(null)
                        setImagePreview(userDetails?.profilePicture || '')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {confirm ? (
                <div className=''></div>
              ) : (
                <div className='flex-1 '>
                  <div className='flex items-start justify-start'>
                    <div>
                      <h1 className='text-3xl font-bold text-gray-300 font-mono'>
                        {userDetails.name}
                      </h1>
                      <p className='text-indigo-500 font-medium font-mono'>
                        {userDetails.blogName}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className=' rounded ml-7 px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                    >
                      <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                      <span className='relative'>Edit Profile</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className='ml-3 relative inline-flex items-center justify-start px-7 py-3 overflow-hidden font-medium transition-all bg-red-600 rounded-xl group'
                    >
                      <span className='absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-800 rounded group-hover:-mr-4 group-hover:-mt-4'>
                        <span className='absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white'></span>
                      </span>
                      <span className='absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-700 rounded-2xl group-hover:mb-12 group-hover:translate-x-0'></span>
                      <span className='relative w-full text- font-mono text-white transition-colors duration-200 ease-in-out group-hover:text-white'>
                        Log Out
                      </span>
                    </button>
                  </div>

                  <p className='mt-2 text-gray-300 font-mono max-w-2xl'>
                    {userDetails.bio}
                  </p>

                  <div className='mt-4 flex flex-wrap items-center gap-4 text-gray-400'></div>

                  <div className='mt-4 flex gap-4'></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className=' bg-black max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-6'>
              {/* Stats Grid */}
              {isloading ? (
                <div className=''>
                  {' '}
                  <Loading />
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                  {stats.map(status => (
                    <div
                      key={status.label}
                      className='bg-black backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'
                    >
                      <div className='flex items-center gap-3 '>
                        <div className={`p-1 rounded-lg   bg-opacity-10`}>
                          {/* <stat.icon className={`h-6 w-6 ${stat.color}`} /> */}
                        </div>
                        <div className=' flex flex-col justify-center items-center'>
                          <p className='text-sm flex justify-center items-center font-mono text-indigo-500'>
                            {status.label}
                          </p>
                          <p className='text-2xl font-mono font-bold text-white'>
                            {status.value}
                          </p>
                        </div>
                      </div>
                      <div className='mt-2 flex items-center justify-center text-center text-sm '>
                        <span className='text-green-400 text center font-mono'>
                          {status.change}
                        </span>
                        {/* <span className='text-gray-500 ml-2'>vs last month</span> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* dummyuser Posts */}
              <div className='bg-black backdrop-blur-lg rounded-xl p-6 border border-indigo-500'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-semibold text-gray-300 font-mono'>
                    Recent Posts
                  </h2>
                  <div className='flex gap-2'>
                    {/* <button className='px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors'>
                     
                    </button> */}
                    <button className='px-4 py-2 text-sm font-mono text-gray-400 hover:text-white transition-colors'>
                      Wrote by You
                    </button>
                  </div>
                </div>

                <div className='space-y-6 bg-black backdrop-blur-lg'>
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

            {/* Sidebar */}
            <div className='space-y-6 overflow-y-auto '>
              {/* Saved Posts */}
              <div className='bg-black backdrop-blur-lg rounded-xl p-6 border border-gray-700/50'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-2'>
                    <Bookmark className='h-5 w-5 text-indigo-500' />
                    <h2 className='text-lg font-semibold text-gray-300'>
                      Saved Posts
                    </h2>
                  </div>
                </div>
                {savedblogs.map(post => (
                  <SavedBlogComponent
                    key={post.id}
                    id={post.id}
                    authorId={post.authorId}
                    title={post.title}
                    content={post.content}
                    authorName={post.author.name}
                    publishDate=' save the date'
                    url={post.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className='fixed inset-0 bg-black/5 backdrop-blur-sm z-50 flex items-center justify-center'>
            <div className='bg-black/90 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl border border-indigo-500/50'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold font-mono text-gray-300'>
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className='text-gray-400 hover:text-white'
                >
                  <X size={24} />
                </button>
              </div>

              <form
                onSubmit={
                  handleSubmit
                }
                className='space-y-6'
              >
                {/* Avatar Upload */}
                <div className='flex items-center gap-4'></div>

                {/* Form Fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium font-mono text-gray-300 mb-1'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={editeduser.name}
                      onChange={handleInputChange}
                      className='w-full bg-gray-900/50 border border-indigo-700 font-mono text-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium font-mono text-gray-300 mb-1'>
                      Blog Name
                    </label>
                    <input
                      type='text'
                      name='blogName'
                      value={editeduser.blogName}
                      onChange={handleInputChange}
                      className='w-full bg-gray-900/50 border border-indigo-500 font-mono text-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium font-mono text-gray-300 mb-1'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={editeduser.email}
                      onChange={handleInputChange}
                      className='w-full bg-gray-900/50 border border-indigo-500 font-mono text-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium font-mono text-gray-300 mb-1'>
                      Bio
                    </label>
                    <textarea
                      value={editeduser.bio}
                      name='bio'
                      onChange={handleInputChange}
                      rows={3}
                      className='w-full bg-gray-900/50 border border-indigo-500 font-mono text-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium font-mono text-gray-300 mb-1'>
                      Location
                    </label>
                    <input
                      type='text'
                      name='location'
                      value={editeduser.location}
                      onChange={handleInputChange}
                      className='w-full bg-gray-900/50 border border-indigo-500 font-mono text-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent'
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex justify-end gap-4 pt-4'>
                  <button
                    onClick={handleCancel}
                    className='box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none'
                  >
                    <span className='absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0'></span>
                    <span className='absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0'></span>
                    <span className='relative z-20 flex items-center text-sm'>
                      <svg
                        className='relative w-5 h-5 mr-2 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M13 10V3L4 14h7v7l9-11h-7z'
                        ></path>
                      </svg>
                      Cancel
                    </span>
                  </button>

                  <button
                    type='submit'
                    disabled={isSaving}
                    className='relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group'
                  >
                    <span
                      className={`absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease ${
                        isSaving ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    ></span>
                    <span className='absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease'>
                      <span className='absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md'></span>
                      <span className='absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md'></span>
                    </span>
                    <span className='relative text-white'>
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
