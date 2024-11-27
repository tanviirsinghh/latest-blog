import React, { useState, useRef } from 'react'
import { PencilIcon, UploadIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { User } from '../../hooks/index';
// import { Avatar } from '../BlogCard';

interface Userinfo {
  name: string
  email: string
  bio: string
}
export function Photo({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
  <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
      {name[0]}
  </span>
</div>
}
export default function ProfileInfo ({user} : {user: User }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<Userinfo>({
    name: '',
    email: '',
    bio: ''
  })
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem('token')
    toast.done('Account Logout')
  
    navigate('/signin')
}
  //   const [avatarPreview, setAvatarPreview] = useState(user.avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)
  //   const [showUserActivities, setShowUserActivities] = useState(true)
  //   const [showLikes, setShowLikes] = useState(true)

  const handleEditToggle = () => {

    setIsEditing(!isEditing)
    if (isEditing) {
         
      console.log('Saving user data:', editedUser)
      alert(
        'Profile Updated: Your profile changes have been saved successfully.'
      )
    }
  }
 
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    // let prevObj = {prev}:userinfo //refers to the DOM element that triggered the event(in this exammple it is Input element), it gives us the properties of the input like classname, src etc
    setEditedUser(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }
  const handleOnClick= ()=>{
       setIsEditing(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // setAvatarPreview(reader.result as string)
        // Here you would typically upload the file to your backend
        console.log('Uploading new avatar:', file)
      }
      reader.readAsDataURL(file)
      alert(
        'Photo Uploaded: Your new profile photo has been uploaded successfully.'
      )
    }
  }
 
  return (
  
   
    <div  className='overflow-y-auto h-96 w-96 roundeed-lg shadow-lg bg-white '>
      <div className='overflow-y-auto h-full w-full  shadow rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Profile Information</h2>
        <div className='flex items-center space-x-4 mb-4'>
          <div className='relative'>
            <img
                src={user.profilePicture}
                alt={user.name}
                // fallback={user.name.charAt(0)}
                className="w-20 h-20 cursor-pointer"
                onClick={handleAvatarClick}
              />
            <div className='absolute bottom-0 right-0  text-white rounded-full p-1'>
              <UploadIcon className='h-4 w-4' />
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>{user.name}</h2>
            <p className='text-gray-500'>{user.email}</p>
          </div>
        </div>
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          accept='image/*'
          onChange={handleFileChange}
        />
        <button
          className='mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'
          onClick={handleAvatarClick}
        >
          Change Profile Picture
        </button>
        {isEditing ? (
          <form className=' space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <input
                id='name'
                name='name'
                
                onChange={handleInputChange}
                className='mt-1 block w-full  rounded-md border-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                
                onChange={handleInputChange}
                className='mt-1 block w-full  rounded-md border-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='bio'
                className='block text-sm font-medium text-gray-700'
              >
                bio
              </label>
              <textarea
                id='bio'
                name='bio'
                
                onChange={handleInputChange}
                className='mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                rows={3}
              />
            </div>
          </form>
        ) : (
          <p className='text-gray-700'><span className='text-black font-sans text-md font-bold'>Niche</span> - <span className='text-green-600 font-serif text-md font-bold'> {user.blogName}</span></p>
        )}
        <button
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          onClick={handleEditToggle}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
          <PencilIcon className='inline-block ml-2 h-4 w-4' />
        </button>
        {/* Logout the user */}
        <button
          className='mt-4 ml-9 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
          onClick={Logout}
        >
          Logout
          {/* <PencilIcon className='inline-block ml-2 h-4 w-4' /> */}
        </button>
        { isEditing?(
        <button onClick={handleOnClick}  className="mt-4 ml-9 px-7 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Cancel
        </button>): (<span className=""></span>) }
      </div>
    </div>
  
  )
}
