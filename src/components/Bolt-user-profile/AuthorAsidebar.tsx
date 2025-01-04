// import { Twitter, Linkedin, Globe, Mail } from 'lucide-react'
import { useUserDetails } from '../..//hooks'
import { TrophySpin } from 'react-loading-indicators'
interface AuthorAsidebarProps {
  authorId: string
}

export default function AuthorAsidebar ({ authorId }: AuthorAsidebarProps) {
  const { userDetails } = useUserDetails(authorId)
  if (!userDetails) {
    return (
      <aside className='lg:col-span-1'>
        <div className='sticky top-44 bg-gray-900 rounded-lg shadow-lg p-6 '>
          <div className='flex justify-center items-normal'>
            <TrophySpin
              color='#3164cc'
              size='medium'
              text=''
              textColor='#f2f2f2'
            />
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className='lg:col-span-1'>
      <div
        className='sticky top-44 rounded-lg p-6 
        bg-gray-900 
        border border-gray-800
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        hover:bg-gray-800 
        transition-all duration-300
        space-y-6'
      >
        <div className='text-center'>
          <img
            src={userDetails.profilePicture}
            alt={userDetails.name}
            className='w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 hover:border-indigo-400 transition-colors duration-300'
          />
          <h2 className='text-2xl text-gray-100 font-bold'>
            {userDetails.name}
          </h2>
          <p className='text-indigo-300 font-medium'>{userDetails.blogName}</p>
        </div>

        <div className='text-gray-300 text-center'>
          <p>{userDetails.bio}</p>
        </div>

        <div>
          <h3 className='font-semibold mb-3 text-gray-100'>Recent Posts</h3>
          <ul className='space-y-2'>
            {userDetails.posts.map((post, index) => (
              <li
                key={index}
                className='bg-gray-800 rounded p-2 hover:bg-gray-700 transition-colors duration-200'
              >
                <a
                  href='#'
                  className='text-gray-300 hover:text-indigo-300 transition-colors duration-200'
                >
                  {post.title}
                </a>
                {/* <p className='text-sm text-gray-400'>{post._count.comment} likes</p> */}
              </li>
            ))}
          </ul>
        </div>

        <div className='border-t border-gray-700 pt-4'>
          <h3 className='font-semibold mb-3 text-gray-100'>Contact</h3>
          <p className='text-gray-300'>{userDetails.email}</p>
        </div>
      </div>
    </aside>
  )

  // return (

  //     <aside className='lg:col-span-1'>
  //         <div className='sticky top-44 rounded-lg p-6
  //      bg-black/5 backdrop-blur-lg
  //      border border-white/10
  //      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
  //      hover:bg-black/10
  //      transition-all duration-300'>
  //         <div className='text-center mb-6'>
  //           <img
  //             src={userDetails.profilePicture}
  //             alt='Emma Roberts'
  //             className='w-24 h-24 rounded-full mx-auto mb-4'
  //           />
  //           <h2 className='text-xl text-gray-300 font-bold'>
  //             {userDetails.name}
  //           </h2>
  //           <p className='text-gray-300'>{userDetails.blogName}</p>
  //         </div>

  //         <div className='mb-6'>
  //           <p className='text-gray-300'>{userDetails.bio}</p>
  //         </div>

  //         <div className='border-t border-gray-200 pt-4'>
  //           <h3 className='font-semibold mb-3 text-gray-300'>
  //             {userDetails.email}
  //           </h3>
  //           <div className='flex justify-center space-x-4'>
  //             <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
  //               <Twitter className='w-5 h-5' />
  //             </a>
  //             <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
  //               <Linkedin className='w-5 h-5' />
  //             </a>
  //             <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
  //               <Globe className='w-5 h-5' />
  //             </a>
  //             <a className='text-gray-300 hover:text-blue-300 cursor-pointer'>
  //               <Mail className='w-5 h-5' />
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </aside>

  // )
}
