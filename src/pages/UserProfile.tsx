import ProfileInfo from '../components/UserProfile.tsx/ProfileInfo'
import SavedBlogs from '../components/UserProfile.tsx/SavedBlogs'
import MyActivities from '../components/UserProfile.tsx/MyActivities'
import Navbar from '../components/Navbar'
// import NewLikeComments from '../components/UserProfile.tsx/NewLikeComment';
import { useUserDetails } from '../hooks/index';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { toast } from 'react-toastify';
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
// const user = {
//   name: "Jane Doe",
//   email: "jane.doe@example.com",
//   bio: "Passionate blogger and tech enthusiast",
//   avatar: "/placeholder.svg?height=100&wuserIdth=100"
// }

// Mock data for saved blogs
// const savedBlogs = [
//   { userId: 1, title: "10 React Hooks You Should Know", author: "John Smith" },
//   { userId: 2, title: "The Future of AI in Web Development", author: "Emily Johnson" },
//   { userId: 3, title: "Mastering CSS GruserId Layout", author: "Alex Lee" },
//   { userId: 4, title: "Understanding TypeScript Generics", author: "Sarah Brown" },
//   { userId: 5, title: "Building Scalable Node.js Applications", author: "Michael Chen" },
//   { userId: 6, title: "Responsive Design Best Practices", author: "Laura Martinez" },
//   { userId: 7, title: "Introduction to GraphQL", author: "DavuserId Wilson" },
//   { userId: 8, title: "Optimizing React Performance", author: "Emma Davis" },
// ]

// Mock data for user activities
// const userActivities = {
//   likes: [
//     { userId: 1, title: "The Art of Clean Code", author: "Robert C. Martin" },
//     { userId: 2, title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
//   ],
//   comments: [
//     { userId: 1, title: "Python for Data Science", author: "Jake VanderPlas", comment: "Great article! Very informative." },
//     { userId: 2, title: "Machine Learning Basics", author: "Andrew Ng", comment: "This helped me understand the concepts better." },
//   ]
// }

// Mock data for recent activities on user's posts
// const recentActivities = {
//   likes: [
//     { userId: 1, title: "Your GuuserIde to React Hooks", user: "Alice Johnson" },
//     { userId: 2, title: "Understanding Async/Await", user: "Bob Williams" },
//   ],
//   comments: [
//     { userId: 1, title: "Your GuuserIde to React Hooks", user: "Charlie Brown", comment: "This was exactly what I needed. Thanks!" },
//     { userId: 2, title: "Understanding Async/Await", user: "Diana Smith", comment: "Could you elaborate more on error handling?" },
//   ]
// }

export default function UserProfile () {
  const navigate = useNavigate();
  // useParams will get all the data related to the parameter, it will provuserIde the params to us
  //  const userId = localStorage.getItem('userId')
  //  console.log(userId)
   const {loading, userDetails,setUserDetails} = useUserDetails(
    // userId: userId || " "
   )
  //  const {refreshData, setRefreshData}= useState('')
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
if(loading){
  return <div>
      loading...
  </div>
 }
 if (loading || !userDetails) {
  return <div>
     
             loading...
          </div>
}
  // const [isEditing, setIsEditing] = useState(false)
  // const [editedUser, setEditedUser] = useState(user)
  // const [avatarPreview, setAvatarPreview] = useState(user.avatar)
  // const fileInputRef = useRef<HTMLInputElement>(null)
  // const [showUserActivities, setShowUserActivities] = useState(true)
  // const [showLikes, setShowLikes] = useState(true)
    
  // const handleEditToggle = () => {
  //   setIsEditing(!isEditing)
  //   if (isEditing) {
  //     // Here you would typically save the changes to the backend
  //     console.log("Saving user data:", editedUser)
  //     alert("Profile Updated: Your profile changes have been saved successfully.")
  //   }
  // }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target //refers to the DOM element that triggered the event(in this exammple it is Input element), it gives us the properties of the input like classname, src etc
  //   setEditedUser(prev => ({ ...prev, [name]: value }))
  // }

  // const handleAvatarClick = () => {
  //   fileInputRef.current?.click()
  // }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setAvatarPreview(reader.result as string)
  //       // Here you would typically upload the file to your backend
  //       console.log("Uploading new avatar:", file)
  //     }
  //     reader.readAsDataURL(file)
  //     alert("Photo Uploaded: Your new profile photo has been uploaded successfully.")
  //   }
  // }
  return (
<>
<Navbar />
    <div className='h-[60rem] w-full inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] '>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"> */}
      
      <div className='h-[34rem] w-full  flex flex-col justify-center items-center'>
        <div className='h-16 w-56  flex justify-center items-center '>
          <h1 className='text-3xl font-bold font-sans  '>User Profile</h1>
        </div>
        <div className='h-3/4 w-3/4 flex justify-evenly items-center  '>
          <ProfileInfo
           user={userDetails!} 
            getRefreshData={getRefreshData}/>
          <SavedBlogs />
        </div>
      </div>
      <div className=' h-1/3 flex justify-center items-center '>
        <MyActivities />
        {/* Its a new component yet to be editted */}
        {/* <NewLikeComments/> */}
      </div>
    </div>
    </>
  )
}
