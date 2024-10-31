import React, { useState, useRef } from 'react'
import { PencilIcon, UploadIcon } from 'lucide-react'


interface Userinfo{
    name:string,
    email:string,
    bio:string
}
export default function ProfileInfo() {

const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<Userinfo>({
    name:"",
    email:"",
    bio:""
  })
//   const [avatarPreview, setAvatarPreview] = useState(user.avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)
//   const [showUserActivities, setShowUserActivities] = useState(true)
//   const [showLikes, setShowLikes] = useState(true)

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (isEditing) {
      // Here you would typically save the changes to the backend
      console.log("Saving user data:", editedUser)
      alert("Profile Updated: Your profile changes have been saved successfully.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    // let prevObj = {prev}:userinfo //refers to the DOM element that triggered the event(in this exammple it is Input element), it gives us the properties of the input like classname, src etc
setEditedUser( prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // setAvatarPreview(reader.result as string)
        // Here you would typically upload the file to your backend
        console.log("Uploading new avatar:", file)
      }
      reader.readAsDataURL(file)
      alert("Photo Uploaded: Your new profile photo has been uploaded successfully.")
    }
  }
  return (
    <div className='h-96'>
      <div className=" bg-blue-500 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              {/* <Avatar
                src={avatarPreview}
                alt={editedUser.name}
                fallback={editedUser.name.charAt(0)}
                className="w-20 h-20 cursor-pointer"
                onClick={handleAvatarClick}
              /> */}
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                <UploadIcon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tanvir Singh</h2>
              <p className="text-gray-500">tanvirsingh@email.com</p>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            onClick={handleAvatarClick}
          >
            Change Profile Picture
          </button>
          {isEditing ? (
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  value={"sfsdfd"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={"sdsfdhf"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={"sdfdfsd"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                />
              </div>
            </form>
          ) : (
            <p className="text-gray-700">{"sdfds"}</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleEditToggle}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
            <PencilIcon className="inline-block ml-2 h-4 w-4" />
          </button>
        </div>
    </div>
  )
}
