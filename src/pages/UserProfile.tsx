import ProfileInfo from '../components/UserProfile.tsx/ProfileInfo'
import SavedBlogs from '../components/UserProfile.tsx/SavedBlogs'
import MyActivities from '../components/UserProfile.tsx/MyActivities'
import Navbar from '../components/Navbar'

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
//   avatar: "/placeholder.svg?height=100&width=100"
// }

// Mock data for saved blogs
// const savedBlogs = [
//   { id: 1, title: "10 React Hooks You Should Know", author: "John Smith" },
//   { id: 2, title: "The Future of AI in Web Development", author: "Emily Johnson" },
//   { id: 3, title: "Mastering CSS Grid Layout", author: "Alex Lee" },
//   { id: 4, title: "Understanding TypeScript Generics", author: "Sarah Brown" },
//   { id: 5, title: "Building Scalable Node.js Applications", author: "Michael Chen" },
//   { id: 6, title: "Responsive Design Best Practices", author: "Laura Martinez" },
//   { id: 7, title: "Introduction to GraphQL", author: "David Wilson" },
//   { id: 8, title: "Optimizing React Performance", author: "Emma Davis" },
// ]

// Mock data for user activities
// const userActivities = {
//   likes: [
//     { id: 1, title: "The Art of Clean Code", author: "Robert C. Martin" },
//     { id: 2, title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
//   ],
//   comments: [
//     { id: 1, title: "Python for Data Science", author: "Jake VanderPlas", comment: "Great article! Very informative." },
//     { id: 2, title: "Machine Learning Basics", author: "Andrew Ng", comment: "This helped me understand the concepts better." },
//   ]
// }

// Mock data for recent activities on user's posts
// const recentActivities = {
//   likes: [
//     { id: 1, title: "Your Guide to React Hooks", user: "Alice Johnson" },
//     { id: 2, title: "Understanding Async/Await", user: "Bob Williams" },
//   ],
//   comments: [
//     { id: 1, title: "Your Guide to React Hooks", user: "Charlie Brown", comment: "This was exactly what I needed. Thanks!" },
//     { id: 2, title: "Understanding Async/Await", user: "Diana Smith", comment: "Could you elaborate more on error handling?" },
//   ]
// }

export default function UserProfile () {
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

    <div className='h-[60rem] w-full  '>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Navbar />
      <div className='h-[34rem] w-full  flex flex-col justify-center items-center'>
        <div className='h-16 w-56  flex justify-center items-center '>
          <h1 className='text-3xl font-bold font-sans  '>User Profile</h1>
        </div>
        <div className='h-3/4 w-3/4 flex justify-evenly items-center  '>
          <ProfileInfo />
          <SavedBlogs />
        </div>
      </div>
      <div className=' h-1/3 flex justify-center items-center '>
        <MyActivities />
      </div>
    </div>
    </div>
  )
}
