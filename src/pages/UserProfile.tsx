import React, { useState, useRef } from 'react'
import { BookmarkIcon, PencilIcon, UploadIcon, ThumbsUpIcon, MessageCircleIcon } from 'lucide-react'

// Simple Avatar component

// const Avatar = ({ src, alt, fallback, className = '', ...props }) => (
//   <div className={`relative inline-block ${className}`} {...props}>
//     {src ? (
//       <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
//     ) : (
//       <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full text-gray-600 font-semibold">
//         {fallback}
//       </div>
//     )}
//   </div>
// )

// Mock data for the user
const user = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  bio: "Passionate blogger and tech enthusiast",
  avatar: "/placeholder.svg?height=100&width=100"
}

// Mock data for saved blogs
const savedBlogs = [
  { id: 1, title: "10 React Hooks You Should Know", author: "John Smith" },
  { id: 2, title: "The Future of AI in Web Development", author: "Emily Johnson" },
  { id: 3, title: "Mastering CSS Grid Layout", author: "Alex Lee" },
  { id: 4, title: "Understanding TypeScript Generics", author: "Sarah Brown" },
  { id: 5, title: "Building Scalable Node.js Applications", author: "Michael Chen" },
  { id: 6, title: "Responsive Design Best Practices", author: "Laura Martinez" },
  { id: 7, title: "Introduction to GraphQL", author: "David Wilson" },
  { id: 8, title: "Optimizing React Performance", author: "Emma Davis" },
]

// Mock data for user activities
const userActivities = {
  likes: [
    { id: 1, title: "The Art of Clean Code", author: "Robert C. Martin" },
    { id: 2, title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
  ],
  comments: [
    { id: 1, title: "Python for Data Science", author: "Jake VanderPlas", comment: "Great article! Very informative." },
    { id: 2, title: "Machine Learning Basics", author: "Andrew Ng", comment: "This helped me understand the concepts better." },
  ]
}

// Mock data for recent activities on user's posts
const recentActivities = {
  likes: [
    { id: 1, title: "Your Guide to React Hooks", user: "Alice Johnson" },
    { id: 2, title: "Understanding Async/Await", user: "Bob Williams" },
  ],
  comments: [
    { id: 1, title: "Your Guide to React Hooks", user: "Charlie Brown", comment: "This was exactly what I needed. Thanks!" },
    { id: 2, title: "Understanding Async/Await", user: "Diana Smith", comment: "Could you elaborate more on error handling?" },
  ]
}

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [avatarPreview, setAvatarPreview] = useState(user.avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showUserActivities, setShowUserActivities] = useState(true)
  const [showLikes, setShowLikes] = useState(true)

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (isEditing) {
      // Here you would typically save the changes to the backend
      console.log("Saving user data:", editedUser)
      alert("Profile Updated: Your profile changes have been saved successfully.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target //refers to the DOM element that triggered the event(in this exammple it is Input element), it gives us the properties of the input like classname, src etc
    setEditedUser(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
        // Here you would typically upload the file to your backend
        console.log("Uploading new avatar:", file)
      }
      reader.readAsDataURL(file)
      alert("Photo Uploaded: Your new profile photo has been uploaded successfully.")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Avatar
                src={avatarPreview}
                alt={editedUser.name}
                fallback={editedUser.name.charAt(0)}
                className="w-20 h-20 cursor-pointer"
                onClick={handleAvatarClick}
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                <UploadIcon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{editedUser.name}</h2>
              <p className="text-gray-500">{editedUser.email}</p>
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
                  value={editedUser.name}
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
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                />
              </div>
            </form>
          ) : (
            <p className="text-gray-700">{editedUser.bio}</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleEditToggle}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
            <PencilIcon className="inline-block ml-2 h-4 w-4" />
          </button>
        </div>
        <div className="md:col-span-1 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Saved Blogs</h2>
          <div className="h-[300px] overflow-y-auto pr-2">
            <ul className="space-y-4">
              {savedBlogs.map(blog => (
                <li key={blog.id} className="flex items-start space-x-2">
                  <BookmarkIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-sm text-gray-500">by {blog.author}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Activities</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show:</span>
            <button
              className={`px-3 py-1 text-sm rounded-full ${showUserActivities ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setShowUserActivities(true)}
            >
              My Activities
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${!showUserActivities ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setShowUserActivities(false)}
            >
              Recent Activities
            </button>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 text-sm rounded-l-full ${showLikes ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShowLikes(true)}
          >
            Likes
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-r-full ${!showLikes ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShowLikes(false)}
          >
            Comments
          </button>
        </div>
        <div>
          {showLikes ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Likes</h3>
              <ul className="space-y-2">
                {(showUserActivities ? userActivities.likes : recentActivities.likes).map(like => (
                  <li key={like.id} className="flex items-start space-x-2">
                    <ThumbsUpIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{like.title}</p>
                      <p className="text-sm text-gray-500">
                        {/* {showUserActivities ? `by ${like.author}` : `liked by ${like.user}`} */}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <ul className="space-y-2">
                {(showUserActivities ? userActivities.comments : recentActivities.comments).map(comment => (
                  <li key={comment.id} className="flex items-start space-x-2">
                    <MessageCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{comment.title}</p>
                      <p className="text-sm text-gray-500">
                        {/* {showUserActivities ? `by ${comment.author}` : `commented by ${comment.user}`} */}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}