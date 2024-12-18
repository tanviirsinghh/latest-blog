import { Twitter, Linkedin, Globe, Mail } from 'lucide-react'
import { useUserDetails } from '../..//hooks'
import { TrophySpin } from 'react-loading-indicators';
interface AuthorAsidebarProps {
    authorId: string;
  }
  
  export default function AuthorAsidebar({ authorId }: AuthorAsidebarProps) {
  
  const { userDetails } = useUserDetails(authorId)
 if (!userDetails) {
    return (
        
      <aside className='lg:col-span-1'>
      <div className='sticky top-44 bg-gray-900 rounded-lg shadow-lg p-6 '>
      <div className='flex justify-center items-normal'>
      <TrophySpin color="#3164cc" size="medium" text="" textColor="#f2f2f2" />
      </div>    
      </div>       
             
      </aside>
    )
  }
  return (
   
      <aside className='lg:col-span-1'>
        <div className='sticky top-44 bg-gray-900 rounded-lg shadow-lg p-6'>
          <div className='text-center mb-6'>
            <img
              src={userDetails.profilePicture}
              alt='Emma Roberts'
              className='w-24 h-24 rounded-full mx-auto mb-4'
            />
            <h2 className='text-xl text-gray-300 font-bold'>
              {userDetails.name}
            </h2>
            <p className='text-gray-300'>{userDetails.blogName}</p>
          </div>

          <div className='mb-6'>
            <p className='text-gray-300'>{userDetails.bio}</p>
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <h3 className='font-semibold mb-3 text-gray-300'>
              Connect with {userDetails.name}
            </h3>
            <div className='flex justify-center space-x-4'>
              <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                <Twitter className='w-5 h-5' />
              </a>
              <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                <Linkedin className='w-5 h-5' />
              </a>
              <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                <Globe className='w-5 h-5' />
              </a>
              <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>
        </div>
      </aside>

  )
}
