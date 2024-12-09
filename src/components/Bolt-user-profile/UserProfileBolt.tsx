import React, { FormEvent, useEffect, useState } from 'react'
// import { PencilIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Update: Added navigate for navigation
// import ImageUploadHook from '../../hooks/ImageUploadHook'
import { BACKEND_URL } from '../../config'
import { Edit3, MapPin, Calendar, Twitter, Github, Linkedin, Camera, X, Award, Heart, MessageCircle, Bookmark, Share2, Clock, BarChart3, TrendingUp, PencilIcon } from 'lucide-react';
import { useUserDetails } from '../../hooks/index';
import Loading from '../Loading'
import ImageUploadHook from '../../hooks/ImageUploadHook'


// interface ProfileInfoProps {
//   user: user
//   getRefreshData: () => Promise<void>
// }

export default function ProfileInfo () {
  // const [isEditing, setIsEditing] = useState(false)
  // const [user, setUser] = useState(null)
  const {loading, userDetails,setUserDetails} = useUserDetails(
    // userId: userId || " "
   )
   const [isSaving, setIsSaving] = useState(false);

  const [editeduser, setEditeduser] = useState({
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    blogName: userDetails?.blogName || '',
    bio: userDetails?.bio || '',
    location: userDetails?.location || '',
    coverpicture:userDetails?.coverpicture || ''
    
    // coverpicture: user?.coverpicture || ''
  })
  useEffect(() => {
    if (userDetails) {
      setEditeduser({
        name: userDetails.name || '',
        email: userDetails.email || '',
        blogName: userDetails.blogName || '',
        bio: userDetails.bio || '',
        location: userDetails.location || '',
        coverpicture: userDetails.coverpicture || '',
      });
    }
  }, [userDetails]);
  // const handleUpdateProfile = (updatedData: typeof user) => {
  //   setdummyuser(updatedData);
  //   setIsEditModalOpen(false);
  // };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(userDetails?.profilePicture || '')
  const [confirm, setConfirm] = useState(false)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate() // Update: Replacing window.location.href

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
   
    // setdummyuser(updatedData);
    // setIsEditModalOpen(false);
  }
  const handleCancel = () =>{
    if(userDetails){
      setEditeduser(userDetails); // Reset the edited state to the original data from the database.

    }

    setIsEditModalOpen(false)

  }
  const getRefreshData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Sign In first');
      navigate('/signin');
      return;
    }
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
        headers: {
          Authorization: ` ${token}`, // Ensure token format is correct
        },
      });
      console.log('Got refresh response of user details', response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to refresh user details.');
    }
  };
   const token = localStorage.getItem('token')
   console.log(token)
   if(!token){
    navigate('/signin')
    return 
}

 if (loading || !userDetails) {
  return <div>
           <Loading/>
          </div>
}





  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>  ) => {

    e.preventDefault();
    // setLoading(true)
    setIsSaving(true); // Disable the button

    console.log('submit working')
    const token = localStorage.getItem('token')
     console.log(userDetails)
      try {
        // Simplified input check logic
        const payload: Partial<typeof editeduser> = {}
        if (editeduser.name !== userDetails.name) payload.name = editeduser.name
        if (editeduser.email !== userDetails.email) payload.email = editeduser.email
        if (editeduser.blogName !== userDetails.blogName) payload.blogName = editeduser.blogName
        if (editeduser.bio !== userDetails.bio) payload.bio = editeduser.bio
        if (editeduser.location !== userDetails.location) payload.location = editeduser.location
        if (editeduser.coverpicture !== userDetails.coverpicture) payload.coverpicture = editeduser.coverpicture;

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
          // setLoading(false)
           // Fetch updated data to refresh the component
        } else {
          toast.info('No changes detected.')
          // setIsSaving(false); // Disable the button

        }
      } catch (err) {
        setIsSaving(false); // Disable the button

        toast.error('Failed to update profile. Please try again.')
      }

    // setIsEditModalOpen(false)// Toggle edit mode
  }

  const handleImageUpload = async () => {
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

        // Update profile picture in the backend
        await axios.put(
          `${BACKEND_URL}/api/v1/user/update-profile-picture`,
          { profilePicture: imageUrl },
          { headers: { Authorization: token } }
        )
        await getRefreshData()
        // setIsEditModalOpen(false)
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



  // const [dummyuser, setdummyuser] = useState({
  //   name: "Sarah Johnson",
  //   blogName: "TechInsights",
  //   email: "sarah.johnson@example.com",
  //   avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //   bio: "Senior Software Engineer | Tech Blogger | Cloud Architecture Enthusiast",
  //   coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
  //   location: "San Francisco, CA",
  //   joinedDate: "January 2022",
  //   social: {
  //     twitter: "@sarahtechblog",
  //     github: "sarahj",
  //     linkedin: "sarahjohnson"
  //   }
  // });

  const stats = [
    { label: 'Total Views', value: '238K', icon: BarChart3, change: '+12.5%', color: 'text-cyan-400' },
    { label: 'Blog Posts', value: '47', icon: TrendingUp, change: '+5.2%', color: 'text-purple-400' },
    { label: 'Followers', value: '12.5K', icon: TrendingUp, change: '+18.3%', color: 'text-pink-400' },
    { label: 'Comments', value: '1.2K', icon: MessageCircle, change: '+7.1%', color: 'text-amber-400' },
  ];

  const savedPosts = [
    {
      title: "The Future of Web Development",
      author: "Mike Chen",
      date: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    },
    {
      title: "Understanding TypeScript Generics",
      author: "Emily Rodriguez",
      date: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    },
    {
      title: "Advanced Git Workflows",
      author: "Alex Thompson",
      date: "2 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    }
  ];

  const dummyuserPosts = [
    {
      title: "Understanding React 18's Concurrent Features",
      excerpt: "An in-depth look at the new concurrent features in React 18 and how they improve application performance.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      date: "2 days ago",
      readTime: "5 min",
      views: "1.2K",
      likes: 234,
      comments: 45,
    },
    {
      title: "Building Scalable Applications with Next.js",
      excerpt: "Learn how to leverage Next.js features to build performant and scalable web applications.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      date: "5 days ago",
      readTime: "8 min",
      views: "2.5K",
      likes: 456,
      comments: 78,
    }
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-80 relative">
          <img 
            src={userDetails.coverpicture} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
          <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-lg text-white hover:bg-gray-900/70 transition-colors">
            <Camera size={18} />
            <span>Change Cover</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 relative">
            {/* profile picture update */}
            <div className="relative group">
              <img  // if not found image put a random image,    fix this later
                src={ imagePreview || userDetails.profilePicture} 
                alt={userDetails.name}
                className="w-36 h-36 rounded-full border-1 border-gray-900 shadow-xl"
              />
              <button
          className='absolute bottom-3 right-2 bg-sky-500 text-white p-2 rounded-full hover:bg-blue-600'
          onClick={() => setConfirm(true)}
        >
          <PencilIcon size={18} />
        </button>
                  {/* <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera size={24} className="text-white" />
                <input type="file" className="hidden" accept="image/*" onClick={imgChange} />

              </label> */}
            </div>





            {confirm && (
            <div className=" absolute left-44 bg-gray-800/50 backdrop-blur-lg rounded-xl p-2 border border-gray-700/50 " >
                    <div className="grid grid-cols-1 space-y-2">
                        {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label> */}
                        {/* <input
            type='file'
            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            
                   */}
              </div>
                    <div className="grid  grid-cols-1 space-y-2">
                                    {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label> */}
                        <div className="flex  items-center justify-center  mt-3 h-24 w-60">
                            <label className="flex flex-col rounded-lg border-4 border-dashed h-24  p-2 group text-center">
                                <div className="h-24 w-full text-center flex flex-col cursor-pointer  justify-center items-center  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    {/* <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"/> */}
                                    </div>
                                    <p className=" text-xs pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                </div>
                                <input
            type='file'
            className="hidden"
            accept='image/*'
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0])
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            }}
          />                               </label>
                        </div>
                    </div>
                            <p className="text-xs text-gray-300 text-center mt-2">
                                <span>File type: Types of Images only</span>
                            </p>
                    <div className='flex justify-evenly items-center'>
                    <button
              className={`h-8 my-3 w-20 flex justify-center items-center bg-blue-500 text-xs text-gray-100   rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline  shadow-lg cursor-pointer transition ease-in duration-300' ${
                load
                  ? 'bg-gray-400 cursor-not-allowed pointer-events-none'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={handleImageUpload}
              disabled={load}
            >
              Confirm
            </button>
            <button
              className="h-8 my-3 w-20 flex justify-center items-center bg-red-500 text-xs text-gray-100     rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-600 shadow-lg cursor-pointer transition ease-in duration-300"
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






            {/* pop up for image upload */}
            {/* {confirm && (
        <div className='bg-blue-900 h-28 '>
          <input
            type='file'
            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            accept='image/*'
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0])
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            }}
          />
          <div className='mt-4 flex justify-center gap-3'>
            <button
              className={`className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300" ${
                load
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={handleImageUpload}
              disabled={load}
            >
              Confirm
            </button>
            <button
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
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
      )} */}

            {/* <div className="relative group">
                  <img
                    src={userDetails.profilePicture}
                    alt={userDetails.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Camera size={20} className="text-white" />
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>   */}
{confirm? <div className=""></div> :
            <div className="flex-1">
              <div className="flex items-start justify-start">
                <div>
                  <h1 className="text-3xl font-bold text-white">{userDetails.name}</h1>
                  <p className="text-cyan-400 font-medium">{userDetails.blogName}</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 ml-16 py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              </div>
              
              <p className="mt-2 text-gray-300 max-w-2xl">{userDetails.bio}</p>
              
              <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{userDetails.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Joined {"userDetails.joinedDate"}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                {/* <a href={`https://twitter.com/${user.social.twitter}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href={`https://github.com/${user.social.github}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href={`https://linkedin.com/in/${user.social.linkedin}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Linkedin size={20} />
                </a> */}
              </div>
            </div>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                      {/* <stat.icon className={`h-6 w-6 ${stat.color}`} /> */}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-400">{stat.change}</span>
                    <span className="text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* dummyuser Posts */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                    Most Recent
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                    Most Popular
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {dummyuserPosts.map((post, index) => (
                  <div key={index} className="group">
                    <div className="flex gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900/70 transition-colors cursor-pointer">
                      <img 
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-white group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime} read</span>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>

                        <div className="flex items-center gap-6 mt-3">
                          <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                            <Heart size={18} />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                            <MessageCircle size={18} />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                            <Bookmark size={18} />
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Posts */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-cyan-400" />
                  <h2 className="text-lg font-semibold text-white">Saved Posts</h2>
                </div>
                <button className="text-sm text-cyan-400 hover:text-cyan-300">View All</button>
              </div>

              <div className="space-y-4">
                {savedPosts.map((post, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/50 transition-colors cursor-pointer"
                  >
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{post.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">{post.author}</span>
                        <span className="text-gray-600">•</span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock size={14} />
                          <span>{post.date}</span>
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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800/90 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={
              handleSubmit
              // handleInputChange(editeduser);
            } className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4">
                {/* <div className="relative group">
                  <img
                    src={dummyuser.avatar}
                    alt={dummyuser.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Camera size={20} className="text-white" />
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div> */}
                {/* <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Profile Picture
                  </label>
                  <p className="text-sm text-gray-400">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div> */}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name" 
                    value={editeduser.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Blog Name
                  </label>
                  <input
                    type="text"
                    name="blogName" 
                    value={editeduser.blogName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email" 
                    value={editeduser.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={editeduser.bio}
                    name="bio" 
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location" 
                    value={editeduser.location}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Twitter username
                  </label>
                  <input
                    type="text"
                    value={"dummyuser.social.twitter"}
                    onChange={(e) => setEditeduser({
                      ...editeduser,
                     Social: e.target.value })
                    className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={ handleCancel }
                  className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
    type="submit"
    disabled={isSaving} // Disable the button conditionally
    className={`px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 ${
      isSaving ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isSaving ? "Saving..." : "Save Changes"}
  </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




















// import  { useState } from 'react';
// import { Edit3, MapPin, Calendar, Twitter, Github, Linkedin, Camera, X, Award, Heart, MessageCircle, Bookmark, Share2, Clock, BarChart3, TrendingUp, users } from 'lucide-react';

// export default function userProfileBolt() {
//   const [user, setuser] = useState({
//     name: "Sarah Johnson",
//     blogName: "TechInsights",
//     email: "sarah.johnson@example.com",
//     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     bio: "Senior Software Engineer | Tech Blogger | Cloud Architecture Enthusiast",
//     coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
//     location: "San Francisco, CA",
//     joinedDate: "January 2022",
//     social: {
//       twitter: "@sarahtechblog",
//       github: "sarahj",
//       linkedin: "sarahjohnson"
//     }
//   });

//   const stats = [
//     { label: 'Total Views', value: '238K', icon: BarChart3, change: '+12.5%', color: 'text-cyan-400' },
//     { label: 'Blog Posts', value: '47', icon: TrendingUp, change: '+5.2%', color: 'text-purple-400' },
//     { label: 'Followers', value: '12.5K', icon: users, change: '+18.3%', color: 'text-pink-400' },
//     { label: 'Comments', value: '1.2K', icon: MessageCircle, change: '+7.1%', color: 'text-amber-400' },
//   ];

//   const savedPosts = [
//     {
//       title: "The Future of Web Development",
//       author: "Mike Chen",
//       date: "2 days ago",
//       thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
//     },
//     {
//       title: "Understanding TypeScript Generics",
//       author: "Emily Rodriguez",
//       date: "1 week ago",
//       thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
//     },
//     {
//       title: "Advanced Git Workflows",
//       author: "Alex Thompson",
//       date: "2 weeks ago",
//       thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
//     }
//   ];

//   const userPosts = [
//     {
//       title: "Understanding React 18's Concurrent Features",
//       excerpt: "An in-depth look at the new concurrent features in React 18 and how they improve application performance.",
//       thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
//       date: "2 days ago",
//       readTime: "5 min",
//       views: "1.2K",
//       likes: 234,
//       comments: 45,
//     },
//     {
//       title: "Building Scalable Applications with Next.js",
//       excerpt: "Learn how to leverage Next.js features to build performant and scalable web applications.",
//       thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
//       date: "5 days ago",
//       readTime: "8 min",
//       views: "2.5K",
//       likes: 456,
//       comments: 78,
//     }
//   ];

//   const handleUpdateProfile = (updatedData: typeof user) => {
//     setuser(updatedData);
//     setIsEditModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       {/* Profile Header */}
//       <div className="relative">
//         <div className="h-80 relative">
//           <img 
//             src={user.coverImage} 
//             alt="Cover" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
//           <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-lg text-white hover:bg-gray-900/70 transition-colors">
//             <Camera size={18} />
//             <span>Change Cover</span>
//           </button>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 relative">
//             <div className="relative group">
//               <img 
//                 src={user.avatar} 
//                 alt={user.name}
//                 className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-xl"
//               />
//               <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Camera size={24} className="text-white" />
//               </button>
//             </div>

//             <div className="flex-1">
//               <div className="flex items-start justify-start">
//                 <div>
//                   <h1 className="text-3xl font-bold text-white">{user.name}</h1>
//                   <p className="text-cyan-400 font-medium">{user.blogName}</p>
//                 </div>
//                 <button
//                   onClick={() => setIsEditModalOpen(true)}
//                   className="flex items-center gap-2 px-4 ml-16 py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-medium rounded-lg transition-colors"
//                 >
//                   <Edit3 size={18} />
//                   Edit Profile
//                 </button>
//               </div>
              
//               <p className="mt-2 text-gray-300 max-w-2xl">{user.bio}</p>
              
//               <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-400">
//                 <div className="flex items-center gap-1">
//                   <MapPin size={16} />
//                   <span>{user.location}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Calendar size={16} />
//                   <span>Joined {user.joinedDate}</span>
//                 </div>
//               </div>

//               <div className="mt-4 flex gap-4">
//                 <a href={`https://twitter.com/${user.social.twitter}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
//                   <Twitter size={20} />
//                 </a>
//                 <a href={`https://github.com/${user.social.github}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
//                   <Github size={20} />
//                 </a>
//                 <a href={`https://linkedin.com/in/${user.social.linkedin}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
//                   <Linkedin size={20} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {stats.map((stat) => (
//                 <div key={stat.label} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
//                       <stat.icon className={`h-6 w-6 ${stat.color}`} />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">{stat.label}</p>
//                       <p className="text-2xl font-bold text-white">{stat.value}</p>
//                     </div>
//                   </div>
//                   <div className="mt-2 flex items-center text-sm">
//                     <span className="text-green-400">{stat.change}</span>
//                     <span className="text-gray-500 ml-2">vs last month</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* user Posts */}
//             <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
//                 <div className="flex gap-2">
//                   <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
//                     Most Recent
//                   </button>
//                   <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
//                     Most Popular
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {userPosts.map((post, index) => (
//                   <div key={index} className="group">
//                     <div className="flex gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900/70 transition-colors cursor-pointer">
//                       <img 
//                         src={post.thumbnail}
//                         alt={post.title}
//                         className="w-24 h-24 rounded-lg object-cover"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-medium text-lg text-white group-hover:text-cyan-400 transition-colors">
//                           {post.title}
//                         </h3>
//                         <p className="text-gray-400 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                        
//                         <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
//                           <span>{post.date}</span>
//                           <span>•</span>
//                           <span>{post.readTime} read</span>
//                           <span>•</span>
//                           <span>{post.views} views</span>
//                         </div>

//                         <div className="flex items-center gap-6 mt-3">
//                           <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
//                             <Heart size={18} />
//                             <span>{post.likes}</span>
//                           </button>
//                           <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
//                             <MessageCircle size={18} />
//                             <span>{post.comments}</span>
//                           </button>
//                           <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
//                             <Bookmark size={18} />
//                           </button>
//                           <button className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
//                             <Share2 size={18} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Saved Posts */}
//             <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-2">
//                   <Bookmark className="h-5 w-5 text-cyan-400" />
//                   <h2 className="text-lg font-semibold text-white">Saved Posts</h2>
//                 </div>
//                 <button className="text-sm text-cyan-400 hover:text-cyan-300">View All</button>
//               </div>

//               <div className="space-y-4">
//                 {savedPosts.map((post, index) => (
//                   <div 
//                     key={index}
//                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900/50 transition-colors cursor-pointer"
//                   >
//                     <img
//                       src={post.thumbnail}
//                       alt={post.title}
//                       className="w-12 h-12 rounded-lg object-cover"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium text-white truncate">{post.title}</h3>
//                       <div className="flex items-center gap-2 mt-1 text-sm">
//                         <span className="text-gray-400">{post.author}</span>
//                         <span className="text-gray-600">•</span>
//                         <div className="flex items-center gap-1 text-gray-500">
//                           <Clock size={14} />
//                           <span>{post.date}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-gray-800/90 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl border border-gray-700/50">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
//               <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white">
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={(e) => {
//               e.preventDefault();
//               handleUpdateProfile(user);
//             }} className="space-y-6">
//               {/* Avatar Upload */}
//               <div className="flex items-center gap-4">
//                 <div className="relative group">
//                   <img
//                     src={user.avatar}
//                     alt={user.name}
//                     className="w-20 h-20 rounded-full"
//                   />
//                   <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
//                     <Camera size={20} className="text-white" />
//                     <input type="file" className="hidden" accept="image/*" />
//                   </label>
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Profile Picture
//                   </label>
//                   <p className="text-sm text-gray-400">
//                     Recommended: Square image, at least 400x400px
//                   </p>
//                 </div>
//               </div>

//               {/* Form Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     value={user.name}
//                     onChange={(e) => setuser({ ...user, name: e.target.value })}
//                     className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Blog Name
//                   </label>
//                   <input
//                     type="text"
//                     value={user.blogName}
//                     onChange={(e) => setuser({ ...user, blogName: e.target.value })}
//                     className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={user.email}
//                     onChange={(e) => setuser({ ...user, email: e.target.value })}
//                     className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Bio
//                   </label>
//                   <textarea
//                     value={user.bio}
//                     onChange={(e) => setuser({ ...user, bio: e.target.value })}
//                     rows={3}
//                     className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     value={user.location}
//                     onChange={(e) => setuser({ ...user, location: e.target.value })}
//                     className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Twitter username
//                   </label>
//                   <input
//                     type="text"
//                     value={user.social.twitter}
//                     onChange={(e) => setuser({
//                       ...user,
//                       social: { ...user.social, twitter: e.target.value }
//                     })}
//                     className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end gap-4 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }