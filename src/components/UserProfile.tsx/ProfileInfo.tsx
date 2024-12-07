import React, { useState } from 'react'
import { PencilIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Update: Added navigate for navigation
import ImageUploadHook from '../../hooks/ImageUploadHook'
import { BACKEND_URL } from '../../config'
import { User } from '../../hooks'

interface ProfileInfoProps {
  user: User
  getRefreshData: () => Promise<void>
}

export default function ProfileInfo ({
  user,
  getRefreshData
}: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    blogName: user?.blogName || ''
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(user?.profilePicture || '')
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
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
    setEditedUser(prev => ({ ...prev, [name]: value }))
  }

  const toggleEditMode = async () => {
    const token = localStorage.getItem('token')
    if (isEditing) {
      try {
        // Simplified input check logic
        const payload: Partial<typeof editedUser> = {}
        if (editedUser.name !== user.name) payload.name = editedUser.name
        if (editedUser.email !== user.email) payload.email = editedUser.email
        if (editedUser.blogName !== user.blogName)
          payload.blogName = editedUser.blogName

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
          await getRefreshData() // Fetch updated data to refresh the component
        } else {
          toast.info('No changes detected.')
        }
      } catch (err) {
        toast.error('Failed to update profile. Please try again.')
      }
    }

    setIsEditing(prev => !prev) // Toggle edit mode
  }

  const handleImageUpload = async () => {
    if (!image) {
      toast.error('Please select an image before confirming.')
      return
    }
    const token = localStorage.getItem('token')
    try {
      setLoading(true)
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
        toast.success('Image uploaded successfully!')
      } else {
        toast.error('Image upload failed. Please try again.')
      }
    } catch (err) {
      console.error('Image upload error:', err)
      toast.error('An error occurred during image upload.')
    } finally {
      setLoading(false)
      setConfirm(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md'>
      <div className='relative'>
        <img
          src={imagePreview || '/default-avatar.png'}
          alt='Profile'
          className='w-24 h-24 rounded-full border'
        />
        <button
          className='absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600'
          onClick={() => setConfirm(true)}
        >
          <PencilIcon size={16} />
        </button>
      </div>

      {confirm && (
        <div className='mt-2 text-center'>
          <input
            type='file'
            accept='image/*'
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0])
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            }}
          />
          <div className='mt-2 flex justify-center gap-2'>
            <button
              className={`px-4 py-2 text-white rounded ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={handleImageUpload}
              disabled={loading}
            >
              Confirm
            </button>
            <button
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
              onClick={() => {
                setConfirm(false)
                setImage(null)
                setImagePreview(user?.profilePicture || '')
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className='w-full mt-4'>
        <label className='block text-sm font-semibold'>Name</label>
        <input
          type='text'
          name='name'
          value={editedUser.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`w-full mt-1 p-2 border rounded ${
            isEditing ? 'border-blue-400' : 'border-gray-300'
          } focus:outline-none`}
        />
      </div>

      <div className='w-full mt-4'>
        <label className='block text-sm font-semibold'>Email</label>
        <input
          type='email'
          name='email'
          value={editedUser.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`w-full mt-1 p-2 border rounded ${
            isEditing ? 'border-blue-400' : 'border-gray-300'
          } focus:outline-none`}
        />
      </div>

      <div className='w-full mt-4'>
        <label className='block text-sm font-semibold'>Blog Name</label>
        <textarea
          name='blogName'
          value={editedUser.blogName}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`w-full mt-1 p-2 border rounded ${
            isEditing ? 'border-blue-400' : 'border-gray-300'
          } focus:outline-none`}
        />
      </div>

      <div className='flex gap-4 mt-4'>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={toggleEditMode}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
        <button
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
