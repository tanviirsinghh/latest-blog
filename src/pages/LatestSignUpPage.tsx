import ImageUploadHook from '../hooks/ImageUploadHook'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LatestSignupPage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/blogs')
    }
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [blogName, setBlogName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState<File | null>(null)
  // storing the temporary url here to show on frontend when user select the picture
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // storing the image url for quick preview
      // When you create an object URL using URL.createObjectURL(),
      //it occupies memory in the browser until it's manually released.
      //If you create multiple object URLs without revoking them,
      //it can lead to a memory leak, as the URLs remain allocated even if they are no longer needed.
      // if old img present and new image is getting update the revoke the first image
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
      const newPreviewURL = URL.createObjectURL(file)
      setImagePreview(newPreviewURL)

      // storing the img file to send it to the cloudinary server
      setImage(file)
      console.log('img stored in the state')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //  read the chatgpt response
    e.preventDefault()
    if (!name || !email || !password || !blogName) {
      toast.error('All fields are required!')
      return
    }

    try {
      const imgUrl = image ? await ImageUploadHook(image) : ''
      if (!imgUrl && image) {
        // If image is present but upload failed
        toast.error('Image upload failed. Cannot proceed.')
        return
      }
      console.log('image uploaded successfully and here is your url' + imgUrl)
      await sendData(imgUrl || '') // Handle empty URLs gracefully
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      toast.error('An unexpected error occurred. Please try again.')
    }
  }

  const sendData = async (imgurl: string | undefined) => {
    try {
      console.log('entered request frontend with url and user info')
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name,
        email,
        password,
        blogName,
        profilePicture: imgurl,
        bio,
        location
      })
      toast.success('Signup Successfully')
      const token = response.data.token
      localStorage.setItem('token', token)
      navigate('/blogs')
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            toast.error('User not found / Sign up first')
            break
          case 411:
            toast.error('Input Not Correct')
            break
          case 500:
            toast.error('Please try again / Internal Server Error')
            break
          case 403:
            toast.error('Email Already in use')
            break
          default:
            toast.error('An unexpected error occurred')
        }
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black p-4'>
      <div className='bg-black rounded-md shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden'>
        <div className='w-full md:w-1/2 p-8 border-2 border-gray-300 bg-black'>
          <h2 className='text-4xl font-bold mb-6 text-gray-300 text-center'>
            Unleash Your Creativity!
          </h2>
          <div className=''>
            <img
              src='src/imgs/modern-blogger-concept-with-flat-design_23-2147996703.jpg'
              alt='Blog '
              className='rounded-lg shadow-lg mb-6'
            />
          </div>
          <p className='text-gray-300 text-lg mb-6 text-center'>
            Join our vibrant community of bloggers and share your unique voice
            with the world!
          </p>
          <div className='flex justify-center space-x-4'>
            <span className='bg-gray-300 rounded-full p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-yellow-50'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
            <span className='bg-gray-300 rounded-full p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-yellow-50'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'
                />
              </svg>
            </span>
            <span className='bg-gray-300 rounded-full p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-yellow-50'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
            </span>
          </div>
        </div>
        <div className='w-full md:w-1/2 p-8 border-2 bg-black  border-gray-400'>
          <h3 className='text-3xl font-bold mb-6 text-gray-300 text-center'>
            Sign Up Now!
          </h3>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex flex-col items-center mb-4'>
              <div className='w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2 border-4 border-gray-300'>
                {image ? (
                  <img
                    src={imagePreview}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label className='cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full  transition-colors'>
                Choose Profile Picture
                <input
                  type='file'
                  className='hidden'
                  onChange={handleImageChange}
                  accept='image/*'
                />
              </label>
            </div>
            <input
              type='text'
              name='name'
              placeholder='Your Awesome Name'
              onChange={e => {
                setName(e.target.value)
              }}
              className='w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              required
            />
            <input
              type='email'
              name='email'
              placeholder='your@email.com'
              onChange={e => {
                setEmail(e.target.value)
              }}
              className='w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Super Secret Password'
              // value={formData.password}
              onChange={e => {
                setPassword(e.target.value)
              }}
              className='w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              required
            />
            <input
              type='text'
              name='Bio'
              placeholder='Bio'
              onChange={e => {
                setBio(e.target.value)
              }}
              className='w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              required
            />
            <input
              type='text'
              name='Location'
              placeholder='Location'
              onChange={e => {
                setLocation(e.target.value)
              }}
              className='w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              required
            />
            <select
              name='blogCategory'
              // value={formData.blogCategory}
              onChange={e => {
                setBlogName(e.target.value)
              }}
              className='w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              required
            >
              <option value=''>Select Your Blog's Superpower</option>
              <option value='technology'>Tech Wizardry</option>
              <option value='lifestyle'>Life's Adventures</option>
              <option value='travel'>Wanderlust Chronicles</option>
              <option value='food'>Culinary Quests</option>
              <option value='fashion'>Style Spectrum</option>
              <option value='other'>Unique Perspectives</option>
            </select>
            <button
              type='submit'
              className='w-full bg-indigo-500 text-yellow-50 font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 hover:text-white transition-all duration-300 transform hover:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'
            >
              Launch My Blogging Journey! 🚀
            </button>
          </form>
          <p className='mt-6 text-sm text-gray-600 text-center'>
            By signing up, you're joining an epic community of creators!
          </p>
          <Link to='/signin'>
            <p className='mt-6 text-sm text-gray-300 text-center'>
              Already have an Account{' '}
              <h5 className='font-semibold underline hover:text-yellow-600'>
                {' '}
                Sign In here
              </h5>
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LatestSignupPage
