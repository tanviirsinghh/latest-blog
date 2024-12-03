
// import React, { useState } from 'react';
// import { PencilIcon } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { User } from '../../hooks/index';
// import axios from 'axios';
// import ImageUploadHook from '../../hooks/ImageUploadHook';
// import { BACKEND_URL } from '../../config';

// export default function ProfileInfo({ user }: { user: User }) {
//   const [edit, setEdit] = useState(false);
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     blogName: '',
//   });
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | undefined>();
//   const [uploadConfirm, setUploadConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // Improved: Renamed Logout to handleLogout for clarity (Point 3)
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     toast.success('You have successfully logged out!');
//     navigate('/signin');
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const confirmImageUpload = async () => {
//     try {
//       if (!image) {
//         toast.error('Please select an image to upload.');
//         return;
//       }

//       setLoading(true);

//       const imgUrl = await ImageUploadHook(image);
//       if (!imgUrl) {
//         toast.error('Failed to upload image.');
//         return;
//       }

//       await axios.put(
//         `${BACKEND_URL}/api/v1/user/update-profile-picture`,
//         { profilePicture: imgUrl },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );

//       toast.success('Profile picture updated successfully!');
//     } catch (error) {
//       console.error('Image upload error:', error);
//       toast.error('An error occurred while uploading the image.');
//     } finally {
//       setLoading(false);
//       setUploadConfirm(false);
//     }
//   };

//   const toggleEdit = () => {
//     setEdit(!edit);
//   };

//   return (
//     <div className="p-4 shadow-lg bg-white rounded-md">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold">Profile Information</h2>
//         <button
//           className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//       <div className="text-center mb-4">
//         {/* Added error and fallback handling for the image preview (Point 1) */}
//         <img
//           src={imagePreview || user.profilePicture || '/default-avatar.png'}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mx-auto"
//         />
//         <button
//           onClick={() => setUploadConfirm(true)}
//           className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           <PencilIcon size={16} />
//         </button>
//       </div>
//       {uploadConfirm && (
//         <div className="mb-4">
//           <input type="file" onChange={handleImageUpload} className="mb-2" />
//           <button
//             onClick={confirmImageUpload}
//             className={`px-4 py-2 bg-green-500 text-white rounded-md ${
//               loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
//             }`}
//             disabled={loading}
//           >
//             Upload
//           </button>
//           <button
//             onClick={() => setUploadConfirm(false)}
//             className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//       <div className="mb-4">
//         <label className="block text-gray-700">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={userData.name}
//           onChange={handleInputChange}
//           disabled={!edit}
//           className={`w-full px-3 py-1 border rounded-md ${
//             edit ? 'border-blue-500' : 'border-gray-300'
//           }`}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={userData.email}
//           onChange={handleInputChange}
//           disabled={!edit}
//           className={`w-full px-3 py-1 border rounded-md ${
//             edit ? 'border-blue-500' : 'border-gray-300'
//           }`}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">blogName</label>
//         <textarea
//           name="blogName"
//           value={userData.blogName}
//           onChange={handleInputChange}
//           disabled={!edit}
//           className={`w-full px-3 py-1 border rounded-md ${
//             edit ? 'border-blue-500' : 'border-gray-300'
//           }`}
//         />
//       </div>
//       <button
//         onClick={toggleEdit}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//       >
//         {edit ? 'Save Changes' : 'Edit Profile'}
//       </button>
//     </div>
//   );
// }


















import React, { useState } from 'react';
import { PencilIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Update: Added navigate for navigation
import ImageUploadHook from '../../hooks/ImageUploadHook';
import { BACKEND_URL } from '../../config';
import { User } from '../../hooks';

interface ProfileInfoProps {
  user: User;
  getRefreshData: () => Promise<void>;
}

export default function ProfileInfo({ user, getRefreshData }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    blogName: user?.blogName || '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(user?.profilePicture || '');
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Update: Replacing window.location.href

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/signin'); // Update: Use navigate instead of window.location.href
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = async () => {
    const token = localStorage.getItem('token')
    if (isEditing) {
      try {
        // Simplified input check logic
        const payload: Partial<typeof editedUser> = {};
        if (editedUser.name !== user.name) payload.name = editedUser.name;
        if (editedUser.email !== user.email) payload.email = editedUser.email;
        if (editedUser.blogName !== user.blogName) payload.blogName = editedUser.blogName;
               
        console.log(payload)
        console.log('pohonch gya,update send krn api kol')
        if (Object.keys(payload).length > 0) {
          await axios.put(`${BACKEND_URL}/api/v1/user/update-user-info`, payload, {
            headers: { Authorization: token },
          });
          toast.success('Profile updated successfully!');
          await getRefreshData(); // Fetch updated data to refresh the component
        } else {
          toast.info('No changes detected.');
        }
      } catch (err) {
        toast.error('Failed to update profile. Please try again.');
      }
    }

    setIsEditing((prev) => !prev); // Toggle edit mode
  };

  const handleImageUpload = async () => {
    if (!image) {
      toast.error('Please select an image before confirming.');
      return;
    }
    const token = localStorage.getItem('token')
    try {
      setLoading(true);
      const imageUrl = await ImageUploadHook(image);
      if (imageUrl) {
        setImagePreview(imageUrl);

        // Update profile picture in the backend
          await axios.put(
          `${BACKEND_URL}/api/v1/user/update-profile-picture`,
          { profilePicture: imageUrl },
          { headers: { Authorization: token } }
        );
        await getRefreshData();
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Image upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      toast.error('An error occurred during image upload.');
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md">
      <div className="relative">
        <img
          src={imagePreview || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />
        <button
          className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
          onClick={() => setConfirm(true)}
        >
          <PencilIcon size={16} />
        </button>
      </div>

      {confirm && (
        <div className="mt-2 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          <div className="mt-2 flex justify-center gap-2">
            <button
              className={`px-4 py-2 text-white rounded ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={handleImageUpload}
              disabled={loading}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={() => {
                setConfirm(false);
                setImage(null);
                setImagePreview(user?.profilePicture || '');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="w-full mt-4">
        <label className="block text-sm font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`w-full mt-1 p-2 border rounded ${
            isEditing ? 'border-blue-400' : 'border-gray-300'
          } focus:outline-none`}
        />
      </div>

      <div className="w-full mt-4">
        <label className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`w-full mt-1 p-2 border rounded ${
            isEditing ? 'border-blue-400' : 'border-gray-300'
          } focus:outline-none`}
        />
      </div>

      <div className="w-full mt-4">
        <label className="block text-sm font-semibold">Blog Name</label>
        <textarea
          name="blogName"
          value={editedUser.blogName}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`w-full mt-1 p-2 border rounded ${
            isEditing ? 'border-blue-400' : 'border-gray-300'
          } focus:outline-none`}
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={toggleEditMode}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}























// import React, { useState, useRef } from 'react'
// import { PencilIcon, UploadIcon } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { User } from '../../hooks/index';
// import axios from 'axios'
// // import { Avatar } from '../BlogCard';
// import ImageUploadHook from '../../hooks/ImageUploadHook'
// import { BACKEND_URL } from '../../config'

// interface Userinfo {
//   name: string
//   email: string
//   blogName: string
// }
// export function Photo ({
//   name,
//   src,
//   alt,
//   fallback,
//   className = '',
//   onClick
// }: {
//   name: string
//   src?: string
//   alt: string
//   fallback: string
//   className?: string
//   onClick?: () => void
// }) {
//   return (
//     <div
//       className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full ${className}`}
//       onClick={onClick}
//       role={onClick ? 'button' : undefined}
//       tabIndex={onClick ? 0 : undefined}
//     >
//       {src ? (
//         <img
//           src={src}
//           alt={alt}
//           className='w-full h-full object-cover rounded-full'
//         />
//       ) : (
//         <span className='text-white font-bold'>{fallback}</span>
//       )}
//     </div>
//   )
// }
// export default function ProfileInfo ({ user }: { user: User }) {
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedUser, setEditedUser] = useState<Userinfo>({
//     name: '',
//     email: '',
//     blogName: ''
//   })
//   const [image, setImage] = useState<File | null>(null)
//   // storing the temporary url here to show on frontend when user select the picture
//   const [imagePreview, setImagePreview] = useState<string | undefined>(
//     undefined
//   )
//   const [confirm, setConfirm] = useState(false)
//   const [url, setUrl] = useState<string | undefined>(undefined)
//   const navigate = useNavigate()
//   const Logout = () => {
//     localStorage.removeItem('token')
//     delete axios.defaults.headers.common['Authorization'] // Clear the default header
//     toast.success('Logged out successfully!')

//     navigate('/signin')
//   }
//   // const [avatarPreview, setAvatarPreview] = useState(user.profilePicture)
//   //   const [showUserActivities, setShowUserActivities] = useState(true)
//   //   const [showLikes, setShowLikes] = useState(true)

//   // If you used state to manage this functionality,
//   //  each interaction with the file input could trigger a re-render. Using useRef,
//   // you can interact with the DOM element without affecting React's rendering cycle.

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing)
//     if (isEditing) {
//       console.log('Saving user data:', editedUser)
//       alert(
//         'Profile Updated: Your profile changes have been saved successfully.'
//       )
//     }
//   }

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target
//     // let prevObj = {prev}:userinfo //refers to the DOM element that triggered the event(in this exammple it is Input element), it gives us the properties of the input like classname, src etc
//     setEditedUser(prev => ({ ...prev, [name]: value }))
//   }

//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const handleAvatarClick = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target && e.target.files && e.target.files[0]) {
//       const file = e.target.files[0]
//       // storing the image url for quick preview
//       // When you create an object URL using URL.createObjectURL(),
//       //it occupies memory in the browser until it's manually released.
//       //If you create multiple object URLs without revoking them,
//       //it can lead to a memory leak, as the URLs remain allocated even if they are no longer needed.
//       // if old img present and new image is getting update the revoke the first image
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview)
//       }
//       const newPreviewURL = URL.createObjectURL(file)
//       setImagePreview(newPreviewURL)
//       // confirmation from the user to upload file
//       setConfirm(true)

//       // storing the img file to send it to the cloudinary server
//       setImage(file)
//       console.log('img stored in the state')
//     }
//   }

//   const handleUploadConfirm = async () => {
//     if (!image) return

//     try {
//       const imgUrl = await ImageUploadHook(image)
//       if (!imgUrl && image) {
//         // If image is present but upload failed
//         toast.error('Image upload failed. Cannot proceed.')
//         return
//       }
//       console.log('image uploaded successfully and here is your url' + imgUrl)

//       // const uploadedImageUrl = response.data.secure_url;
//       // console.log("Image uploaded to Cloudinary:", imgUrl);

//       // Update user profile picture with the uploaded image URL
//       // You can now use this URL for user.profilePicture or save it in the database
//       const Url = imgUrl
//       setUrl(Url)

//       toast.success('Profile picture updated!')
//       // set to false to for next use
//       setConfirm(false)

//       // if(!Url){
//       //   toast.error("Error Uploading Image / Try Again")
//       //   return

// const response = await axios.put(`${BACKEND_URL}/api/v1/user/update-profile-picture`,{
//         profilePicture: imgUrl
//       },
//       {
//         headers:{
//           Authorization: localStorage.getItem('token')
//         }
//       })
//       console.log(response.data)
//       // const token = response.data.token
//       // localStorage.setItem('token', token)
//       // navigate('/blogs')

//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview)
//       }

//       setImagePreview(Url) 
//     } catch (error) {
//       console.error('Error uploading image:', error)
//       toast.error('Failed to upload image. Please try again.')
//     } finally {
//       setConfirm(false) // Close confirmation UI
//     }
//   }

//   const handleUploadCancel = () => {
//     // Revoke preview and reset state
//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview)
//     }
//     setImage(null)
//     setImagePreview(undefined)
//     setConfirm(false) // Close confirmation UI
//   }

//   const handleOnClick = () => {
//     setIsEditing(false)
//   }

//   return (
//     <div className='overflow-y-auto h-96 w-96 roundeed-lg shadow-lg bg-white '>
//       <div className='overflow-y-auto h-full w-full  shadow rounded-lg p-6'>
//         <h2 className='text-xl font-semibold mb-4'>Profile Information</h2>
//         <div className='flex items-center space-x-4 mb-4'>
//           <div className='relative'>
//             <Photo
//               name={user.name}
//               alt={user.name}
//               fallback={user.name.charAt(0)}
//               src={imagePreview || user.profilePicture}
//               className='w-20 h-20 cursor-pointer'
//               onClick={handleAvatarClick}
//             />
//             <div className='absolute bottom-0 right-0 bg-white text-black rounded-full p-1 shadow-md cursor-pointer'>
//               <UploadIcon className='h-4 w-4 text-gray-600' />
//             </div>
//           </div>
//           <div>
//             <h2 className='text-2xl font-bold'>{user.name}</h2>
//             <p className='text-gray-500'>{user.email}</p>
//           </div>
//         </div>
//         <input
//           type='file'
//           // If the file input was visible, you could just click on it directly,
//           // and the file picker would open. But since the input is hidden (className='hidden') for styling purposes,
//           // we need a way to trigger it programmatically. That's where useRef comes in.
//           ref={fileInputRef}
//           className='hidden'
//           accept='image/*'
//           onChange={handleFileChange}
//         />
//         {/* <button
//           className='mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'
//           onClick={handleAvatarClick}
//         >
//           Change Profile Picture
//         </button> */}
//         {isEditing ? (
//           <form className=' space-y-4'>
//             <div>
//               <label
//                 htmlFor='name'
//                 className='block text-sm font-medium text-gray-700'
//               >
//                 Name
//               </label>
//               <input
//                 id='name'
//                 name='name'
//                 onChange={handleInputChange}
//                 className='mt-1 block w-full  rounded-md border-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor='email'
//                 className='block text-sm font-medium text-gray-700'
//               >
//                 Email
//               </label>
//               <input
//                 id='email'
//                 name='email'
//                 type='email'
//                 onChange={handleInputChange}
//                 className='mt-1 block w-full  rounded-md border-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor='blogName'
//                 className='block text-sm font-medium text-gray-700'
//               >
//                 blogName
//               </label>
//               <textarea
//                 id='blogName'
//                 name='blogName'
//                 onChange={handleInputChange}
//                 className='mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
//                 rows={3}
//               />
//             </div>
//           </form>
//         ) : (
//           <p className='text-gray-700'>
//             <span className='text-black font-sans text-md font-bold'>
//               Niche
//             </span>{' '}
//             -{' '}
//             <span className='text-green-600 font-serif text-md font-bold'>
//               {' '}
//               {user.blogName}
//             </span>
//           </p>
//         )}
//         <button
//           className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
//           onClick={handleEditToggle}
//         >
//           {isEditing ? 'Save Changes' : 'Edit Profile'}
//           <PencilIcon className='inline-block ml-2 h-4 w-4' />
//         </button>
//         {/* Logout the user */}
//         <button
//           className='mt-4 ml-9 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
//           onClick={Logout}
//         >
//           Logout
//           {/* <PencilIcon className='inline-block ml-2 h-4 w-4' /> */}
//         </button>
//         {isEditing ? (
//           <button
//             onClick={handleOnClick}
//             className='mt-4 ml-9 px-7 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
//           >
//             Cancel
//           </button>
//         ) : (
//           <span className=''></span>
//         )}
//       </div>
//       {confirm && (
//         <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
//           <div className='bg-white p-6 rounded shadow-lg'>
//             <h2 className='text-lg font-bold mb-4'>Confirm Upload</h2>
//             <p className='text-sm mb-4'>
//               Do you want to upload this profile picture?
//             </p>
//             <div className='flex space-x-4'>
//               <button
//                 onClick={handleUploadConfirm}
//                 className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={handleUploadCancel}
//                 className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition'
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     // confirmation from the user
//   )
// }

